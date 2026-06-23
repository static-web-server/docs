---
outline: deep
---

# Security Headers

**`SWS`** provides several [security headers](https://web.dev/security-headers/) support.

When the [TLS](../features/tls.md) feature is activated _security headers_ are enabled automatically.

This feature is enabled by default on HTTP/1 + HTTP/2 and can be controlled by the boolean `--security-headers` option or the equivalent [SERVER_SECURITY_HEADERS](./../configuration/env#server_security_headers) env.

> [!TIP] Customize HTTP headers
>
> If you want to customize HTTP headers on demand then have a look at the [Custom HTTP Headers](custom-http-headers.md) section.

## Headers included

The following headers are included by default.

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Content-Security-Policy: frame-ancestors 'self'
Referrer-Policy: strict-origin-when-cross-origin
```
