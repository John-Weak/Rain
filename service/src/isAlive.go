package main

import (
	"log"
	"net/http"
	"time"
)

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("Failed to set websocket upgrade: ", err)
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
