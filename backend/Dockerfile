FROM golang:1.16.3-alpine3.13 as dev

WORKDIR /src

COPY go.mod go.sum ./
COPY go.sum .

RUN go mod download
RUN go get -u github.com/cosmtrek/air
COPY . .

EXPOSE 5000

CMD ["air"]


FROM golang:1.16.3-alpine3.13 as builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN CGO_ENABLED=0 go build -o /bin/app


FROM alpine:3.13.6 as production
COPY --from=builder /bin/app /bin/app

EXPOSE 5000
CMD ["/bin/app"]
