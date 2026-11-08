# Maximum Request Header Size

**SWS** limits the size of the request headers. Requests with larger headers get `431 Request Header Fields Too Large`.

SWS keeps the headers of a request in memory until they have fully arrived, so the limit also caps how much data a client can make SWS hold on each connection.

The limit is enabled by default and can be changed with the numeric `--max-header-size` option or its equivalent [SERVER_MAX_HEADER_SIZE](./../configuration/env.md#server-max-header-size) env.

> [!TIP] Tip
>
> The value is in bytes. The default is `16384` (16 KiB) and the value must be greater than `0`.

Here is an example of allowing request headers of up to `32768` bytes (32 KiB).

```sh
static-web-server -d ./public/ --max-header-size 32768
```

Or in the [configuration file](./../configuration/file.md):

```toml
[general]
max-header-size = 32768
```

## Behavior

- The limit applies to every connection: HTTP/1, HTTP/2, TLS, the [HTTP to HTTPS redirect](./http-https-redirect.md) server and [Unix domain sockets](./unix-domain-socket.md).
- On HTTP/1, the limit covers the request line (method, path and query string) and all headers. After the `431` response, SWS closes the connection.
- On HTTP/2, the limit is the maximum header list size SWS announces to clients. HTTP/2 counts each header as its name and value plus 32 bytes, so the same requests come out slightly larger than on HTTP/1.

> [!TIP] Choosing a value
>
> Most requests carry well under 16 KiB of headers. Raise the limit if clients send large cookies or tokens and get `431` responses.
