---
outline: deep
---

# Follow Symlinks

**`SWS`** does not follow symlinks by default for security reasons.

As a result, SWS will respond with a `403 Forbidden` status if a symlink is requested and that symlink won't also be shown in the [directory listing](./../features/directory-listing.md) (if enabled).

This behaviour is controlled by the boolean `--follow-symlinks` option (disabled by default) or the equivalent [SERVER_FOLLOW_SYMLINKS](./../configuration/env#server_follow_symlinks) env.

> [!INFO] Important
>
> Read about [security implications](#security-implications) and [performance considerations](#performance-considerations) if you want to enable this feature.

## How it works

SWS applies a **layered security model** on every request, in this order:

1. **Containment**: Verifies that the resolved (canonical) file path lives inside the web root directory.
2. **Symlink policy**: When `--follow-symlinks` is disabled (the default), walks each component of the requested path and checks whether any of them is a symbolic link.
3. **Hidden file policy**: When `--include-hidden` is disabled (the default), rejects dotfiles with a `404 Not Found`.

> [!NOTE] Note
> Regardless of the `--follow-symlinks` setting, SWS **always** refuses to serve symlinks that resolve outside the web root. The containment check is always enforced.

## Security implications

When `--follow-symlinks` is set to `true`, the per-component `lstat` checks are skipped and only the containment check runs.

- **Benefit:** No per-component symlink syscalls, helpful for _exceptionally_ deep directory trees.
- **Trade-off:** The symlink policy layer is removed. The containment cache (60s TTL/1024 entries per thread) becomes the sole gate. If someone with filesystem _write_ access replaces a previously-cached directory with a symlink pointing outside the webroot, the stale cache entry could serve that now-unsafe path for up to 60 seconds.

> [!WARNING] Warning
> Exploiting this requires **filesystem write access to the webroot** (typically an admin-level compromise). If an attacker has that access, simpler vectors exist (e.g. replacing files directly). The cache TTL is a defense-in-depth measure, not the primary security boundary.

### Additional measures if `--follow-symlinks` option is needed

Here are some additional measures to consider if you need to enable this feature:

- **Read-only webroot**: Consider mounting the webroot as read-only or making it immutable (`chattr +i` on Linux).
- **Least-privilege user**: Consider running SWS as a dedicated user (non-root) with no write permissions to the webroot.
- **Keep the default if possible**: `--follow-symlinks=false` gives the strongest protection with negligible performance cost.

## Performance considerations

When `--follow-symlinks` is disabled (SWS default), the symlink check calls [`symlink_metadata`][symlink_metadata] (equivalent to `lstat(2)`) once per path component to determine whether each segment is a symlink. For a request like `/assets/images/photo.jpg`, that's three lightweight metadata syscalls.

SWS mitigates the cost through a **per-thread containment cache** that stores previously-verified paths. Once a path has been proven safe, subsequent requests for the same file skip the much more expensive [`canonicalize`][canonicalize] syscall entirely. The cache holds up to 1024 entries per worker thread and is evicted wholesale every 60 seconds, which bounds the window in which a runtime filesystem change (e.g. an admin replacing a directory with a symlink) could bypass the check.

In practice, the performance impact is **negligible** for almost all deployments:

- Typical static-site paths are shallow (1-4 components), so the number of `lstat` calls is small.
- Operating-system inode caches, for example, make `lstat` extremely fast on repeat access.
- The containment cache absorbs the dominant cost (`canonicalize`) on the hot path.

## Example

```sh
static-web-server --port 8787 --root ./public --follow-symlinks
```

[symlink_metadata]: https://doc.rust-lang.org/std/fs/fn.symlink_metadata.html
[canonicalize]: https://doc.rust-lang.org/std/fs/fn.canonicalize.html
