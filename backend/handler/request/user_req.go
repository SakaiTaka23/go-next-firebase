package request

import "github.com/go-playground/validator/v10"

type CreateUser struct {
	Name string `json:"name" validate:"required"`
}

func (c *CreateUser) Validate() error {
	validate := validator.New()
	if err := validate.Struct(c); err != nil {
		return err
	}
	return nil
}
