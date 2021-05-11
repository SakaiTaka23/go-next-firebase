package main

import (
	"github.com/SakaiTaka23/go-react-docker/database"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://127.0.0.1:3000",
		AllowMethods: "GET",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Hello World!",
		})
	})

	if err := app.Listen(":5000"); err != nil {
		panic(err)
	}
}
