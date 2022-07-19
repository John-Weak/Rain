package main

import (
	"github.com/gin-gonic/gin"
)

var isAlive = true

func main() {
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

	r.GET("/record", func(c *gin.Context) {
		recordHandler(c.Writer, c.Request)
	})

	r.Run()
}
