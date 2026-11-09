# Open in Browser

**SWS** can open the server URL in the system's default web browser once it starts listening. This is handy for local development.

The feature is disabled by default and can be controlled by the boolean `--open` option, the equivalent [SERVER_OPEN](../configuration/env.md#server-open) env, or the `open` key in the [config file](../configuration/file.md).

```sh
static-web-server --root ./public --open
# Opens http://localhost:8080/
```

## Custom path

Use the `--open-path` option or the equivalent [SERVER_OPEN_PATH](../configuration/env.md#server-open-path) env to open a specific URL path. A missing leading slash is added.

```sh
static-web-server --root ./public --open --open-path /docs/
# Opens http://localhost:8080/docs/
```

```toml
[general]
open = true
open-path = "/docs/"
```

## Behavior

- The URL uses `https` with [TLS](./tls.md) and the actual port the server is listening on.
- When listening on all interfaces (`::` or `0.0.0.0`), the URL uses `localhost`. Otherwise it uses the configured host.
- If the browser can't be opened (e.g. on a headless server), SWS logs a warning and keeps running.

> [!WARNING] Restrictions
>
> - `--open-path` requires `--open`.
> - `--open` can't be used with a [Unix domain socket](./unix-domain-socket.md) or a [Windows Service](./windows-service.md).
