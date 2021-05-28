package server

import (
	"backend/infrastructure/middleware"
	"backend/injector"
	"log"

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

	private := app.Group("/", middleware.AuthMiddleware)
	private.Get("/private", func(c *fiber.Ctx) error {
		log.Println(c.Locals("user"))
		return c.JSON(fiber.Map{
			"message": "Private",
		})
	})

	private.Post("/create-user", userHandler.CreateUser)

	return app
}
