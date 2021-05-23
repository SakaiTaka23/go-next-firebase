package usecase

import (
	"backend/entity/model"
	"backend/entity/repository"
)

type UserUsecase interface {
	CreateUser(user *model.User)
}

type userUsecase struct {
	userRepo repository.UserRepository
}

func NewUserUsecase(userRepo repository.UserRepository) UserUsecase {
	userUsecase := userUsecase{userRepo: userRepo}
	return &userUsecase
}

func (usecase *userUsecase) CreateUser(user *model.User) {
	usecase.userRepo.CreateUser(user)
}
