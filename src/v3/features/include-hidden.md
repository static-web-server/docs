---
outline: deep
---

# Include Hidden Files

**`SWS`** _does not_ serve hidden files (dotfiles) by default for security reasons.

As a result, SWS will respond with a `404 Not Found` status for hidden files, and they will not appear in the [directory listing](./directory-listing.md) if enabled.

This behaviour is controlled by the boolean `--include-hidden` option (disabled by default) or the equivalent [SERVER_INCLUDE_HIDDEN](./../configuration/env#server_include_hidden) env.

## Security considerations

Hidden files (dotfiles) earned their name for a reason: they're typically configuration, secrets, or metadata that should **not** be publicly accessible. Examples include:

- `.env` — environment variables, often containing API keys and database passwords
- `.git` — the full Git history and configuration of your repository
- `.htpasswd` — HTTP Basic Auth credential files
- `.aws/`, `.ssh/` — cloud and SSH credentials
- `.DS_Store` — macOS metadata that can leak directory structure information
- Editor configs (`.vscode/`, `.idea/`) — project settings that may expose internal paths

Enabling `--include-hidden` removes this layer of protection entirely. **Any dotfile inside the web root becomes publicly accessible** — there is no allowlist or filtering; every hidden file is served.

> [!WARNING]
> Accidentally exposing `.env` or `.git` can lead to credential leaks, source code disclosure, and infrastructure compromise. This is one of the most common web server misconfigurations in production.

### Additional safeguards

Consider these safeguards before turning on `--include-hidden`:

- **Move secrets out of the web root.** Store `.env` files, keys, and credentials in a directory _above_ `--root`, not inside it.
- **Use a `.gitignore`-style approach.** Only place files you intend to serve inside the web root. Use your build tool or CI pipeline to strip hidden files before deployment.
- **Combine with directory listing.** If directory listing is also enabled, hidden files become visible in the index — audit your web root before enabling both.
- **Run as a dedicated user.** Ensure the SWS process runs under a user account with read-only access to the web root and no access to sensitive system paths.
- **Prefer the default.** `--include-hidden=false` is the safest choice. Enable it only when you have a specific, well-understood reason.

## Example

Enable serving of hidden files:

```sh
static-web-server \
    --port 8787 \
    --root ./public \
    --directory-listing \
    --include-hidden
```
