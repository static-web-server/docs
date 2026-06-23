---
outline: deep
---

# Cache-Control Headers

**`SWS`** provides support for _arbitrary_ [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) HTTP header specifying `public` and `max-age` response directives.

This feature is enabled by default and can be controlled by the boolean `-e, --cache-control-headers` option or the equivalent [SERVER_CACHE_CONTROL_HEADERS](./../configuration/env#server_cache_control_headers) env.

> [!TIP] Customize HTTP headers
>
> If you want to customize HTTP headers on demand then have a look at the [Custom HTTP Headers](custom-http-headers.md) section.

## Cache-Control

Control headers are applied only to the following file types with the corresponding `max-age` values or `no-cache` directive (default).

### `no-cache` (default)

A `no-cache` directive is used by default.

> [!INFO] Note
>
> `no-cache` applies to for example `HTML`, `JSON` and other file types.

### One hour

A `max-age` of _one hour_ is applied only to the following file types.

```txt
atom, rss
```

### One year

A `max-age` of _one year_ is applied only to the following file types.

```txt
avif, bmp, bz2, css, doc, gif, gz, htc, ico, jpeg, jpg, js, jxl, map, mjs, mp3, mp4, ogg, ogv, pdf, png, rar, rtf, tar, tgz, wav, weba, webm, webp, woff, woff2, zip
```

Below is an example of how to enable the feature.

```sh
static-web-server --port 8787 --root ./public --cache-control-headers
```
