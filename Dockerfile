FROM node:20-alpine as builder

RUN mkdir /app
WORKDIR /app

RUN npm install -g npm@10.8.0

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
