# Test updates

Build

```shell
docker compose up --build
```

Update by 1

```bash
hurl examples/upd.hurl
```

Get value

```bash
hurl examples/get.hurl
```

Reset value

```bash
hurl examples/reset.hurl
```

ab

```bash
ab -n 500 -c 20 http://127.0.0.1:3000/upd
```
