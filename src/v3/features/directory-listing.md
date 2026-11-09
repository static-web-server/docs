---
outline: deep
---

# Directory Listing

**`SWS`** provides a directory listing feature to display the content of directories.

This feature is disabled by default and can be controlled by the boolean `-z, --directory-listing` option or the equivalent [SERVER_DIRECTORY_LISTING](./../configuration/env#server-directory-listing) env.

```sh
static-web-server \
    --port 8080 \
    --root ./public \
    --directory-listing
```

And here is an example of how the directory listing looks like.

<img title="SWS - Directory Listing" src="https://user-images.githubusercontent.com/1700322/145420578-5a508d2a-773b-4239-acc0-197ea2062ff4.png" width="400" alt="Directory listing example" />

## Relative paths for entries

SWS uses relative paths for the directory listing entries (file or directory) and is used regardless of the [redirect trailing slash](../features/trailing-slash-redirect.md) feature.

However, when the _"redirect trailing slash"_ feature is disabled and a directory request URI doesn't contain a trailing slash then the entries will contain the path `parent-dir/entry-name` as the link value. Otherwise, just an `entry-name` link value is used (default behavior).

Note also that in both cases, SWS will append a trailing slash to the entry if is a directory.

## Sorting

Sorting by `Name`, `Last modified` and `Size` is enabled as clickable columns when the directory listing is activated via the `--directory-listing=true` option.

You can also use the `sort` query parameter to sort manually by certain attributes from URI. E.g `https://localhost/?sort=5`.

### Sorting by default

Sometimes one wants to sort by a certain attribute but by **default**. In that case, the default ascending or descending ordering of files/dirs by their attributes is provided by the numeric `--directory-listing-order` option or the equivalent [SERVER_DIRECTORY_LISTING_ORDER](./../configuration/env#server-directory-listing-order) env.

To do so you have to pass a [code sorting number](#code-numbers-for-sorting). E.g `--directory-listing-order=2`.

### Code numbers for sorting

Below are the possible number code values for sorting or ordering which are grouped by attribute.

#### Name

- `0`: Ascending
- `1`: Descending

#### Last modified

- `2`: Ascending
- `3`: Descending

#### Size

- `4`: Ascending
- `5`: Descending

#### Default

- `6`: Unordered

> [!TIP] Tips
>
> - The `--directory-listing-order` option depends on `--directory-listing` to be enabled.
> - Use the query `?sort=NUMBER` to customize the sorting via the URI. E.g `https://localhost/?sort=5` (sort by size in descending order)

Example:

```sh
static-web-server \
    --port 8080 \
    --root ./public \
    --directory-listing \
    # E.g Sorting file/dir names in descending order
    --directory-listing-order 1
```

## Output format

**`SWS`** provides support for specifying an output format for the directory listing entries via the string `--directory-listing-format` option or the equivalent [SERVER_DIRECTORY_LISTING_FORMAT](./../configuration/env#server-directory-listing-format) env:

- `html` (default): an HTML page.
- `json`: a JSON array, see [JSON format](#json-format).
- `auto`: chosen per request from the `Accept` header, see [Automatic format](#automatic-format).

> [!TIP] Tips
>
> - The `--directory-listing-format` option depends on `--directory-listing` to be enabled.

### HTML format

This is the default format when `--directory-listing` is enabled.

### JSON format

The JSON format used is shown below for directories and files. Note that the `size` attribute is only available for files and the `mtime` value is UTC-based.

```json
[
  {
    "name": "my-directory",
    "type": "directory",
    "mtime": "2022-10-07T00:53:50Z"
  },
  {
    "name": "my_file.tar.gz",
    "type": "file",
    "mtime": "2022-09-27T22:44:34Z",
    "size": 332
  }
]
```

Here is an example of serving the directory listing in JSON format.

```sh
static-web-server \
    --port 8080 \
    --root ./public \
    --directory-listing \
    --directory-listing-format="json"
```

And below is a client request example to illustrate how the feature works.

```sh
curl -i http://localhost:8080
# HTTP/1.1 200 OK
# content-type: application/json
# content-length: 163
# cache-control: no-cache
# date: Tue, 11 Oct 2022 23:24:55 GMT

# [{"name":"spécial directöry","type":"directory","mtime":"2022-10-07T00:53:50Z"},{"name":"index.html.gz","type":"file","mtime":"2022-09-27T22:44:34Z","size":332}]⏎
```

### Automatic format

With `--directory-listing-format=auto`, SWS picks the format from the request's `Accept` header, following its quality values: `application/json` gets JSON, and `text/html` gets HTML. HTML is also used when the header is missing or lists neither type. The response includes `Vary: Accept` so caches store each format separately.

```sh
static-web-server --root ./public --directory-listing --directory-listing-format=auto

curl -H "Accept: application/json" http://localhost:8080/  # JSON
curl http://localhost:8080/                                 # HTML
```

## Directory Download

**`SWS`** supports downloading the content of a directory as a single file when **Directory Listing** feature is enabled. To activate, specify the list of download format to enable using the `--directory-listing-download` flag or the equivalent [SERVER_DIRECTORY_LISTING_DOWNLOAD](./../configuration/env#server-directory-listing-download) env. Currently, `targz` format is supported.

```sh
static-web-server \
    --port 8080 \
    --root ./public \
    --directory-listing \
    --directory-listing-download="targz"
```

When **Directory Download** is enabled, append `?download` to a directory URL to download it. A link will also be added to the top part of **HTML** output format.

When [symlinks are followed](./follow-symlinks.md), the archive skips entries whose target resolves outside the root directory.
