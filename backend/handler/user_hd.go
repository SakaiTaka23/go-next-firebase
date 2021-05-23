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
	name := new(request.CreateUser)
	_ = c.BodyParser(name)
	user.Name = name.UserName
	handler.userUsecase.ExistOrCreate(&user)
	return c.SendStatus(200)
}
