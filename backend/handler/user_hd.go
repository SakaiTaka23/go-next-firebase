package handler

import (
	"backend/entity/model"
	"backend/handler/request"
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

func (handler *UserHandler) CreateUser(c *fiber.Ctx) error {
	user := c.Locals("user").(model.User)
	name := new(request.CreateUser)
	if err := c.BodyParser(name); err != nil {
		name.UserName = "user"
	}
	log.Printf("recieved body: %s", name)
	user.Name = name.UserName
	handler.userUsecase.CreateUser(&user)
	return c.SendStatus(200)
}
