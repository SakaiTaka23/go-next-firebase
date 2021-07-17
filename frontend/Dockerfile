FROM node:15.13.0-alpine3.10

WORKDIR /app/js/base

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install
COPY . .
