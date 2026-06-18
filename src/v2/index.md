<script setup>import Badges from '@theme/components/badges/Badges.vue';</script>

<Badges />

<hr>

# Overview

**Static Web Server** (or **`SWS`** abbreviated) is a tiny and fast production-ready web server suitable to serve static web files or assets.

It is focused on **lightness and easy-to-use** principles while keeping [high performance and safety](https://blog.rust-lang.org/2015/04/10/Fearless-Concurrency.html) powered by [The Rust Programming Language](https://rust-lang.org).

Written on top of [Hyper](https://github.com/hyperium/hyper) and [Tokio](https://github.com/tokio-rs/tokio) runtime, it provides [concurrent and asynchronous networking abilities](https://rust-lang.github.io/async-book/01_getting_started/02_why_async.html) and the latest HTTP/1 - HTTP/2 implementations.

Cross-platform and available for `Linux`, `macOS`, `Windows`, `FreeBSD`, `NetBSD`, `Android`, `Docker` and `Wasm` (via [Wasmer](https://wasmer.io/wasmer/static-web-server)).

![static-web-server running](https://github.com/static-web-server/static-web-server/assets/1700322/102bef12-1f30-4054-a1bc-30c650d4ffa7)

## Features

- Built with [Rust](https://rust-lang.org), which focuses on [safety, speed and concurrency](https://kornel.ski/rust-c-speed).
- Memory-safe and significantly reduced CPU and RAM overhead.
- Blazing fast static files-serving and asynchronous powered by the latest [Hyper](https://github.com/hyperium/hyper/), [Tokio](https://github.com/tokio-rs/tokio) and a set of [awesome crates](https://github.com/static-web-server/static-web-server/blob/master/Cargo.toml).
- Single __4MB__ (uncompressed) and fully static binary with no dependencies ([Musl libc](https://doc.rust-lang.org/edition-guide/rust-2018/platform-and-target-support/musl-support-for-fully-static-binaries.html)). Suitable for running on [any Linux distro](https://en.wikipedia.org/wiki/Linux_distribution) or [Docker container](https://hub.docker.com/r/joseluisq/static-web-server/tags).
- Optional GZip, Deflate, Brotli or Zstandard (zstd) compression for text-based web files only.
- Compression on-demand via [Accept-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) header.
- Markdown content negotiation via [Accept](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept) header for serving `.md` files.
- [Partial Content Delivery](https://en.wikipedia.org/wiki/Byte_serving) support for byte-serving of large files.
- Optional [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) headers for assets.
- [Termination signal](https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html) handling with [graceful shutdown](https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-terminating-with-grace) ability and grace period.
- [HTTP/2](https://tools.ietf.org/html/rfc7540) and TLS support.
- [Security headers](https://web.dev/security-headers/) for HTTP/2 by default.
- [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [OPTIONS](https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.7) responses.
- Lightweight and configurable logging via [tracing](https://github.com/tokio-rs/tracing) crate.
- Customizable number of blocking and worker threads.
- Optional directory listing with sorting and JSON output format support.
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) with preflight requests support.
- Basic HTTP Authentication.
- Customizable HTTP response headers for specific file requests via glob patterns.
- Fallback pages for 404 errors, useful for Single-page applications.
- Run the server as a [Windows Service](<https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/cc783643(v=ws.10)>).
- Configurable using CLI arguments, environment variables or a TOML file.
- Default and custom error pages.
- Built-in HTTP to HTTPS redirect.
- GET/HEAD Health check endpoint.
- Prometheus-compatible `/metrics` endpoint for traffic monitoring.
- Support for serving pre-compressed (Gzip/Brotli/Zstd) files directly from disk.
- Custom URL rewrites and redirects via glob patterns with replacements.
- Virtual hosting support.
- Multiple index files.
- Maintenance Mode functionality.
- Available as a library crate with opt-in features.
- First-class [Docker](https://docs.docker.com/get-started/overview/) support. [Scratch](https://hub.docker.com/_/scratch), latest [Alpine Linux](https://hub.docker.com/_/alpine) and [Debian](https://hub.docker.com/_/alpine) Docker images.
- Ability to accept a socket listener as a file descriptor for sandboxing and on-demand applications (e.g. [systemd](http://0pointer.de/blog/projects/socket-activation.html)).
- Cross-platform. Pre-compiled binaries for Linux, macOS, Windows, FreeBSD, NetBSD, Android (`x86/x86_64`, `ARM/ARM64`) and WebAssembly (via [Wasmer](https://wasmer.io/wasmer/static-web-server)).

## Benchmarks

<img title="SWS - Benchmarks April 2023" src="https://raw.githubusercontent.com/static-web-server/benchmarks/master/data/2023-04/benchmark-2023-04.png" width="860">

For more details see [the benchmarks repository](https://github.com/static-web-server/benchmarks).

For feedback or questions feel free to reach us on [the discussions page](https://github.com/static-web-server/static-web-server/discussions).

## Community

[SWS Community on Discord](https://discord.gg/VWvtZeWAA7)
