package main

import (
	"log"
	"net/http"
)

func recordHandler(w http.ResponseWriter, r *http.Request) {
	_, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("Failed to set websocket upgrade: ", err)
		return
	}
}
