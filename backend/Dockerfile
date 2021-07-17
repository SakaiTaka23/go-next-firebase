FROM golang:1.16.3-alpine3.13

WORKDIR /app/go/base

COPY go.mod .
COPY go.sum .

RUN go mod download
RUN go get -u github.com/cosmtrek/air
COPY . .
