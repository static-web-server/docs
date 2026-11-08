---
outline: deep
---

# Security Headers

**`SWS`** provides several [security headers](https://web.dev/security-headers/) support.

The feature is enabled by default when SWS is built with the [TLS](../features/tls.md) feature, as all release binaries are, and can be controlled by the boolean `--security-headers` option or the equivalent [SERVER_SECURITY_HEADERS](./../configuration/env#server_security_headers) env.

> [!TIP] Customize HTTP headers
>
> If you want to customize HTTP headers on demand then have a look at the [Custom HTTP Headers](custom-http-headers.md) section.

## Headers included

The following headers are included on every response.

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Content-Security-Policy: frame-ancestors 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

When SWS serves [TLS](../features/tls.md) (`--tls`), the responses also include:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains
```

## HSTS

`Strict-Transport-Security` (HSTS) tells browsers to use only HTTPS for the host and its subdomains for two years. SWS doesn't send it over plain HTTP, since [RFC 6797](https://datatracker.ietf.org/doc/html/rfc6797#section-7.2) forbids it there.

If SWS serves plain HTTP behind a proxy that terminates TLS, add HSTS at the proxy, or with a [custom header](custom-http-headers.md) rule.

The default value doesn't include `preload`, since adding a domain to the browser preload lists is up to its owner. To opt in, set the header with a custom header rule:

```toml
[advanced]

[[advanced.headers]]
source = "**"
headers.Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
```

> [!WARNING] Custom header rules apply to every response
>
> Unlike the built-in header, a custom header rule also applies over plain HTTP. Only add HSTS this way when every client reaches SWS over HTTPS.
