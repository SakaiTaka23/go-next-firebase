package repository

import "backend/entity/model"

type UserRepository interface {
	CreateUser(user *model.User) string
	DeleteUser(id string)
	FindFromID(id string) *model.User
}
