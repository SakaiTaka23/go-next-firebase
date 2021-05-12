package datastore

import (
	"backend/entity/model"
	"backend/entity/repository"
	"backend/infrastructure/datastore/mysql"
)

type UserRepository struct {
	mysql.MySQLHandler
}

func NewUserRepository(sqlHandler mysql.MySQLHandler) repository.UserRepository {
	userRepository := UserRepository{sqlHandler}
	return &userRepository
}

func (userRepo *UserRepository) CreateUser(user *model.User) string {
	userRepo.MySQLHandler.Conn.Create(&user)
	return user.ID
}

func (userRepo *UserRepository) DeleteUser(id string) {
	userRepo.MySQLHandler.Conn.Delete(&model.User{}, id)
}

func (useeRepo *UserRepository) FindFromID(id string) *model.User {
	var user *model.User
	useeRepo.MySQLHandler.Conn.Where("id = ?", id).First(&user)
	return user
}
