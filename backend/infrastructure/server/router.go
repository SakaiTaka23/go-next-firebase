package server

import (
	"backend/infrastructure/middleware"
	"backend/injector"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func SetRouter(app *fiber.App) *fiber.App {
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://127.0.0.1:3000",
		AllowMethods: "GET",
		AllowHeaders: "Authorization",
	}))

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

	private.Get("/login-check", userHandler.CheckLoginUser)

	return app
}
