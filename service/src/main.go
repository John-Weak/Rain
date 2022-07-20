package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var isAlive = true

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	gin.SetMode(gin.ReleaseMode) //comment this line to turn on debug mode
	r := gin.Default()

	r.LoadHTMLFiles("index.html")
	go periodicallyChangeVariable()

	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})

	r.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})

	r.GET("/wsRecord", func(c *gin.Context) {
		if BasicAuthWrapper(c.Writer, c.Request) {
			recordHandler(c.Writer, c.Request)
		}
	})

	r.Run()
}
