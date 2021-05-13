package handler

import (
	"backend/entity/model"
	"backend/usecase"
	"log"

	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	userUsecase usecase.UserUsecase
}

func NewUserHandler(userUsecase usecase.UserUsecase) UserHandler {
	userHandler := UserHandler{userUsecase: userUsecase}
	return userHandler
}

func CheckLoginUser(c *fiber.Ctx) error {
	user := c.Locals("user").(model.User)
	log.Println(user)
	return c.JSON(fiber.Map{
		"message": "login check success",
	})
}
