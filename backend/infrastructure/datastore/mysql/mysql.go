package mysql

import (
	"backend/entity/model"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type MySQLHandler struct {
	Conn *gorm.DB
}

func Connect() *MySQLHandler {
	user := os.Getenv("DB_USERNAME")
	pass := os.Getenv("DB_PASSWORD")
	protocol := "tcp(db:3306)"
	dbname := os.Getenv("DB_DATABASE")

	connection, err := gorm.Open(mysql.Open(user+":"+pass+"@"+protocol+"/"+dbname), &gorm.Config{})

	if err != nil {
		panic("could not connect to the database")
	}

	MySQLHandler := new(MySQLHandler)
	MySQLHandler.Conn = connection

	if err := connection.AutoMigrate(&model.User{}); err != nil {
		panic(err)
	}

	return MySQLHandler
}
