package middleware

import (
	"backend/entity/model"
	"context"
	"fmt"
	"os"
	"strconv"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/gofiber/fiber/v2"
	"google.golang.org/api/option"
)

func authMiddleware(c *fiber.Ctx) error {
	credentialFilePath := "./firebase-adminsdk.json"

	opt := option.WithCredentialsFile(credentialFilePath)
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		fmt.Printf("error: %v\n", err)
	}
	auth, err := app.Auth(context.Background())
	if err != nil {
		fmt.Printf("error: %v\n", err)
	}

	authHeader := c.Get("Authorization")
	idToken := strings.Replace(authHeader, "Bearer ", "", 1)
	token, err := auth.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		fmt.Printf("error verifying ID token: %v\n", err)
		return c.Status(401).SendString("error verifying ID token")
	}
	c.Locals("token", token)

	id := token.UID
	user := model.User{
		ID: id,
	}
	c.Locals("user", user)

	return c.Next()
}

func authMiddlewareDebug(c *fiber.Ctx) error {
	id := c.Get("debug-id", "6ba7b810-9dad-11d1-80b4-00c04fd430c8")
	user := model.User{
		ID: id,
	}
	c.Locals("user", user)

	return c.Next()
}

func SetAuthMiddleware() func(*fiber.Ctx) error {
	// デバッグ・本番時で使い分ける
	var middleware func(c *fiber.Ctx) error
	authDebug, _ := strconv.ParseBool(os.Getenv("AUTH_DEBUG"))
	fmt.Printf("Auth Debug Mode : %t", authDebug)
	if authDebug {
		middleware = authMiddlewareDebug
	} else {
		middleware = authMiddleware
	}
	return middleware
}
