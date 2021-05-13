package middleware

import (
	"backend/entity/model"
	"context"
	"fmt"
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
	// log.Printf("Verified ID token: %v\n", token)

	id := token.UID
	name := token.Claims["name"].(string)
	emails := token.Firebase.Identities["email"].([]interface{})
	email := emails[0].(string)

	user := model.User{
		ID:    id,
		Name:  name,
		Email: email,
	}
	c.Locals("user", user)

	return c.Next()
}
