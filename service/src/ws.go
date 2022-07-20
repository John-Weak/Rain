package main

import (
	"github.com/gorilla/websocket"

	"net/http"
)

func checkOrigin(r *http.Request) bool {
	return true //unsafe,might update later
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     checkOrigin,
}
