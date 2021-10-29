package handler

import (
	"backend/entity/model"
	"backend/handler/request"
	"backend/usecase"

	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	userUsecase usecase.UserUsecase
}

func NewUserHandler(userUsecase usecase.UserUsecase) UserHandler {
	userHandler := UserHandler{userUsecase: userUsecase}
	return userHandler
}

func (handler *UserHandler) CreateUser(c *fiber.Ctx) error {
	user := c.Locals("user").(model.User)
	request := new(request.CreateUser)
	if request.Name == "" {
		request.Name = "username"
	}
	if err := c.BodyParser(request); err != nil {
		return c.SendStatus(400)
	}
	if err := request.Validate(); err != nil {
		return c.SendStatus(400)
	}
	user.Name = request.Name
	err := handler.userUsecase.CreateUser(&user)
	if err != nil {
		return c.SendStatus(500)
	}
	return c.SendStatus(200)
}
