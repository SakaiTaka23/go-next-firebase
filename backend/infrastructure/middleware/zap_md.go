package middleware

import (
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
)

func ZapMiddleware(c *fiber.Ctx) error {
	zap.L().Info("Got Request",
		zap.String("method", c.Method()),
		zap.String("path", c.Path()),
		zap.Int("status", c.Response().StatusCode()))

	return c.Next()
}
