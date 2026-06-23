# Include Hidden Files

**`SWS`** _does not_ serve hidden files (dotfiles) by default for security reasons.

As a result, SWS will respond with a `404 Not Found` status for hidden files, and they will not be shown in the directory listing if enabled.

This behaviour is controlled by the boolean `--include-hidden` option (disabled by default) or the equivalent [SERVER_INCLUDE_HIDDEN](./../configuration/env#server_include_hidden) env.

Here is an example of how to enable serving of hidden files if wanted:

```sh
static-web-server \
    --port 8787 \
    --root ./public \
    --directory-listing \
    --include-hidden
```
