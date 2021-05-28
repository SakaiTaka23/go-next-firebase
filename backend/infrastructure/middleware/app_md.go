package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func SetAppMiddleware(app *fiber.App) *fiber.App {
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://127.0.0.1:3000",
		AllowMethods: "GET,POST",
		AllowHeaders: "Authorization,Content-Type",
	}))

	app.Use(ZapMiddleware)

	return app
}
