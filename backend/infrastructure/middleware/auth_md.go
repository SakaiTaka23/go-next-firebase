package middleware

import (
	"context"
	"fmt"
	"log"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/gofiber/fiber/v2"
	"google.golang.org/api/option"
)

func AuthMiddleware(c *fiber.Ctx) error {
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
	log.Printf("Verified ID token: %v\n", token)
	return c.Next()
}
