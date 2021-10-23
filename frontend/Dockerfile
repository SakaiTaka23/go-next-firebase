FROM node:15.13.0-alpine3.10 as dev

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install
COPY . .

EXPOSE 3000

CMD ["yarn","dev"]

