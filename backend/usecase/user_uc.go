package usecase

import (
	"backend/entity/model"
	"backend/entity/repository"
)

type UserUsecase interface {
	ExistOrCreate(user *model.User)
}

type userUsecase struct {
	userRepo repository.UserRepository
}

func NewUserUsecase(userRepo repository.UserRepository) UserUsecase {
	userUsecase := userUsecase{userRepo: userRepo}
	return &userUsecase
}

func (usecase *userUsecase) ExistOrCreate(user *model.User) {
	findUser := usecase.userRepo.FindFromID(user.ID)
	if findUser.ID == "" {
		usecase.userRepo.CreateUser(user)
	}
}
