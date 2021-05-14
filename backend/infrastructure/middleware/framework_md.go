package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetFrameworkMiddleware(app *fiber.App) *fiber.App {
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://127.0.0.1:3000",
		AllowMethods: "GET",
		AllowHeaders: "Authorization",
	}))

	app.Use(logger.New(logger.Config{
		Format:   "[${time}] ${method} ${path} - ${status}\n",
		TimeZone: "Asia/Tokyo",
	}))

	return app
}
