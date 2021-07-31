package server

import (
	"backend/infrastructure/middleware"
	"backend/injector"

	"github.com/gofiber/fiber/v2"
)

func SetRouter(app *fiber.App) *fiber.App {
	middleware.SetAppMiddleware(app)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Hello World!",
		})
	})

	app.Get("/public", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Public",
		})
	})

	userHandler := injector.InjectUserHandler()

	user := app.Group("/user", middleware.AuthMiddleware)
	user.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Private",
		})
	})

	user.Post("/user", userHandler.CreateUser)

	return app
}
