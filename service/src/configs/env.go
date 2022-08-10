package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Printf("Error loading .env file")
	} else {
		print("Loaded .env file \n")
	}
}

func EnvMongoURI() string {
	return os.Getenv("MONGODB_URI")
}

func EnvBasicUsernameAndPassword() (string, string) {
	return os.Getenv("BASIC_AUTH_USERNAME"), os.Getenv("BASIC_AUTH_PASSWORD")
}
