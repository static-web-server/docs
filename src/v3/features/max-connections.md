# Maximum Connections

**SWS** can limit the number of connections served at the same time.

Each open connection uses a file descriptor and some memory. The [idle timeout](./idle-timeout.md) closes connections that stall, but a client that keeps sending or reading a little data can hold connections open for as long as it wants. A connection limit caps what such clients, or a sudden burst of traffic, can use.

The limit is disabled by default and can be set with the numeric `--max-connections` option or its equivalent [SERVER_MAX_CONNECTIONS](./../configuration/env.md#server-max-connections) env.

> [!TIP] Tip
>
> The default is `0`, which means no limit.

Here is an example of serving at most `1000` connections at the same time.

```sh
static-web-server -d ./public/ --max-connections 1000
```

Or in the [configuration file](./../configuration/file.md):

```toml
[general]
max-connections = 1000
```

## Behavior

- The limit counts every open connection: HTTP/1, HTTP/2, TLS, the [HTTP to HTTPS redirect](./http-https-redirect.md) server and [Unix domain sockets](./unix-domain-socket.md) share it.
- Once the limit is reached, new connections are not rejected. They wait until another connection closes, then they are served. Clients see a connection that opens but doesn't answer yet.
- Connections that keep waiting queue up in the operating system's listen backlog. When the backlog is full, the operating system refuses or drops new connection attempts.
- Each listener accepts one connection beyond the limit and holds it until a slot frees up. With the HTTPS redirect server on, SWS can have up to two connections more than the limit open.
- Idle keep-alive connections keep their slot until the client closes them or the [idle timeout](./idle-timeout.md) does. Over HTTP/1, browsers open up to 6 connections per site, so a low limit can make other clients wait for up to the idle timeout.
- When the limit is reached, SWS logs a warning, at most once a minute.
- On shutdown, connections still waiting for a slot are closed without a response. Connections being served are drained as described in [Graceful Shutdown](./graceful-shutdown.md).
- Requests to the [health endpoints](./health-endpoint.md) (`/livez`, `/readyz`) also wait for a slot, so a liveness probe can time out while the limit is reached.

> [!WARNING] Idle timeout
>
> With `--idle-timeout 0`, a connection that sends nothing keeps its slot until the client closes it, so a few such connections can block the server. SWS logs a warning at startup for this combination. Keep the idle timeout enabled when using a connection limit.

> [!TIP] Choosing a value
>
> When SWS is exposed directly to clients, `1024` is a good starting point. Behind a reverse proxy, the proxy opens far fewer connections and its own limits usually apply first.
>
> Keep the limit below the process file descriptor limit (`ulimit -n`), which also has to cover open files being served. Since a limit is reached by any client that holds connections open, it protects the server's resources but not the availability of the site: use a firewall or a reverse proxy if you need to limit connections per client.
