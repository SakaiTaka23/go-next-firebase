package main

import (
	"backend/infrastructure/datastore/mysql"
	"backend/infrastructure/server"

	"github.com/gofiber/fiber/v2"
)

func main() {
	mysql.Connect()
	app := fiber.New()

	server.SetRouter(app)

	if err := app.Listen(":5000"); err != nil {
		panic(err)
	}
}
