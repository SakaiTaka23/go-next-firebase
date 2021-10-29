package repository

import "backend/entity/model"

type UserRepository interface {
	CreateUser(user *model.User) error
	DeleteUser(id string)
	FindFromID(id string) *model.User
}
