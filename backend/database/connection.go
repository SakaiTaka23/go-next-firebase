package database

import (
	"os"

	"github.com/SakaiTaka23/go-react-docker/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	user := os.Getenv("DB_USERNAME")
	pass := os.Getenv("DB_PASSWORD")
	protocol := "tcp(db:3306)"
	dbname := os.Getenv("DB_DATABASE")

	connection, err := gorm.Open(mysql.Open(user+":"+pass+"@"+protocol+"/"+dbname), &gorm.Config{})

	if err != nil {
		panic("could not connect to the database")
	}

	DB = connection

	if err := connection.AutoMigrate(&models.User{}); err != nil {
		panic(err)
	}
}
