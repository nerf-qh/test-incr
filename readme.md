# Test updates

## Test

Build

```bash
docker compose build
```

Start app

```bash
docker compose --profile=app up
```

And test

```bash
docker compose run --rm ab
```

Result should be

```json
{"value":1000}
```

## Info

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
