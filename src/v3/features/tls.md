---
outline: deep
---

# TLS

**`SWS`** provides [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) support for serving content over encrypted HTTPS connections.

This feature is disabled by default and can be activated via the boolean `-t, --tls` option along with `--tls-cert` (path to the TLS certificate file) and `--tls-key` (path to the private key file). It works with both HTTP/1 and [HTTP/2](./http2).

> [!INFO] Tips
>
> - When TLS is enabled, [Security Headers](./security-headers.md) are also enabled automatically.
> - Combine `--tls` with `--http2` to serve [HTTP/2](./http2) over TLS.
> - The [HTTP to HTTPS redirect](./http-https-redirect.md) feature also requires TLS to be enabled.

## Safe TLS defaults

SWS uses safe TLS defaults backed by [Rustls](https://github.com/rustls/rustls).

- **Cipher suites:**
  - TLS 1.3:
    ```
    TLS13_AES_256_GCM_SHA384
    TLS13_AES_128_GCM_SHA256
    TLS13_CHACHA20_POLY1305_SHA256
    ```
  - TLS 1.2:
    ```
    TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
    TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
    TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256
    TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
    TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
    TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
    ```
- **Key exchange groups:** `X25519`, `SECP256R1`, `SECP384R1`
- **Protocol versions:** TLS 1.2 and 1.3

## Private key file formats

Only the following private key file formats are supported:

- **RSA Private Key:** DER-encoded as specified in [PKCS#1/RFC3447](https://datatracker.ietf.org/doc/html/rfc3447).
- **PKCS8 Private Key:** DER-encoded as specified in [PKCS#8/RFC5958](https://datatracker.ietf.org/doc/rfc5958/).
- **EC Private Key:** Sec1-encoded as specified in [RFC5915](https://www.rfc-editor.org/rfc/rfc5915).

## FIPS-validated Cryptography

For deployments that require FIPS 140-validated cryptography (US federal, regulated industries), SWS can be built with [`aws-lc-rs`](https://github.com/aws/aws-lc-rs) in FIPS mode as the TLS crypto provider, replacing the default [`ring`](https://github.com/briansmith/ring) backend. The underlying cryptographic module is [AWS-LC-FIPS](https://github.com/aws/aws-lc/tree/fips-2024-09-27).

This is opt-in via the `tls-fips` Cargo feature flag, which is mutually exclusive with the default `tls-ring`. Pre-built FIPS binaries and container images are published alongside the regular release artifacts.

The "Safe TLS defaults" listed above describe the `tls-ring` provider. The `tls-fips` provider's defaults are restricted to the subset of FIPS-approved ciphers (no ChaCha20-Poly1305) and FIPS-approved key exchange groups.

> [!INFO] Build requirements
>
> - FIPS builds require `cmake`, `go`, and `libclang` (used by `bindgen` when compiling the FIPS module) at build time. The compiled output is still a single statically-linked binary.
> - Static linking is supported only on Linux x86_64 and aarch64, both `gnu` and `musl` toolchains.
> - The FIPS feature does not change command-line flags, configuration, or the wire protocol; it only swaps the cryptographic backend.

To build from source with FIPS:

```sh
cargo build -v --release --no-default-features \
    --features="tls-fips,compression,directory-listing,directory-listing-download,basic-auth,fallback-page,metrics"
```

Alternatively, in case of build errors with GCC >= 14, try Clang as the C/C++ compiler:

```sh
env CC=clang CXX=clang++ cargo build -v --release --no-default-features \
        --features="tls-fips,compression,directory-listing,directory-listing-download,basic-auth,fallback-page,metrics"
```

Finally, verify that the binary has been compiled with FIPS mode enabled:

```sh
$ static-web-server -V | grep -i "fips"
# FIPS Mode:
#   Module Version:   AWS-LC-FIPS 3.0.x
#   Crypto Provider:  aws-lc-rs (via aws-lc-fips-sys)
```

See the [Cargo features section](../building-from-source.md#cargo-features) for the full list of feature flags.

## Example

Below is an example of how to run the server with TLS enabled (HTTP/1 over TLS).

> [!INFO] Tips
>
> - Either `--host`, `--port` and `--root` have defaults (optional values) so they can be specified or omitted as required.
> - Don't forget to adjust the proper `--port` value when TLS is enabled.
> - The server provides [Termination Signal](https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html) handling with [Graceful Shutdown](https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-terminating-with-grace) ability by default.

```sh
static-web-server \
    --host 127.0.0.1 \
    --port 8787 \
    --root ./my-public-dir \
    --tls \
    --tls-cert ./my-tls.cert \
    --tls-key ./my-tls.key
```
