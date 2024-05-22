# Test updates

Run

```bash
docker compose up --build
```

and test

```bash
hurl examples/reset.hurl &&\
ab -n 500 -c 20 http://127.0.0.1:3000/upd &&\
hurl examples/get.hurl
```

Result should be

```json
{"value":500}
```

Build

```bash
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
