# Quick Start

[Download and install](./download-install) the binary for your specific platform and then type

```sh
static-web-server --root ./my-public-dir
# Serving on http://localhost:8080
```

Or if you use [Docker](https://www.docker.com/) just try

```sh
docker run --rm -it -p 8080:8080 joseluisq/static-web-server:3.0.0-beta.2 -g info
```

> [!INFO] Docker Tip
>
> You can specify a Docker volume like `-v $HOME/my-public-dir:/var/public` to overwrite the default root directory. See [Docker examples](features/docker.md).

- Type `static-web-server --help` or see the [Command-line arguments](./configuration/cli) section.
- See how to configure the server using a [configuration file](./configuration/file) section.
- Have a look at [the features](./features/http1) section for more advanced examples.
