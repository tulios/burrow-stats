# Burrow Stats

Dashboard for burrow kafka consumer lag checking

![screenshot](https://raw.githubusercontent.com/tulios/burrow-stats/master/screenshot.png)

## Running locally

```sh
npm run dev
```

* Remember to create the config file (`configs.json`)

## Production

```sh
NODE_ENV=production npm run build
NODE_ENV=production npm start
```

## Docker

```sh
docker run \
  -p 8022:8022 \
  -e PORT=8022 \
  -v /path/to/your/configs.json:/opt/burrow-stats/configs.json \
  tulios/burrow-stats:latest
```
