package main

import (
	//"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var isAlive = true

func main() {

	r := gin.Default()
	r.LoadHTMLFiles("index.html")
	go periodicallyChangeVariable()

	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})

	r.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})

	r.Run()
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		//fmt.Println("Failed to set websocket upgrade: %v", err)
		return
	}

	message := "none"
	lastisAlive := isAlive
	for {
		if message == "none" || lastisAlive != isAlive {
			if isAlive {
				message = "alive"
			} else {
				message = "dead"
			}
			lastisAlive = isAlive
			conn.WriteMessage(1, []byte(message))
		}
	}
}

func periodicallyChangeVariable() {
	for {
		time.Sleep(2 * time.Second)
		isAlive = !isAlive
	}
}
