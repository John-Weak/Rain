package main

import (
	"github.com/gorilla/websocket"
	"net/http"
	"time"
)

func checkOrigin(r *http.Request) bool {
	return true
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     checkOrigin,
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
