package controllers

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

func checkOrigin(r *http.Request) bool {
	return true //TODO: unsafe,might update later
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     checkOrigin,
}

var isAlive = false

const (
	// Time allowed to write a message to the peer.
	writeWait = 7 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 10 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

func readPump(conn *websocket.Conn, hub *Hub) {
	defer func() {
		//WS closed record the time in database
		go startOutage()
		conn.Close()
		distinctIsAlive(false, hub)
	}()
	conn.SetReadLimit(maxMessageSize)
	conn.SetReadDeadline(time.Now().Add(pongWait))
	conn.SetPongHandler(func(string) error {
		conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})
	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
	}
}

func writePump(conn *websocket.Conn, hub *Hub) {
	distinctIsAlive(true, hub)
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		conn.Close()
	}()

	for {
		<-ticker.C //will run every pingPeriod Seconds
		conn.SetWriteDeadline(time.Now().Add(writeWait))
		if err := conn.WriteMessage(websocket.PingMessage, nil); err != nil {
			//log.Printf("error: %v", err)
			return
		}
		distinctIsAlive(true, hub)
	}
}

func distinctIsAlive(expected bool, hub *Hub) {
	if expected != isAlive {
		isAlive = expected
		message := isAliveMessgae(expected)
		hub.broadcast <- []byte(message)
	}
}

func isAliveMessgae(param bool) string {
	if param {
		return "alive"
	}
	return "dead"
}
