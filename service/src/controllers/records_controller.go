package controllers

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func WS(hub *Hub) gin.HandlerFunc {
	return func(c *gin.Context) {
		wshandler(c.Writer, c.Request, hub)
	}
}

func WSRecord(hub *Hub) gin.HandlerFunc {
	return func(c *gin.Context) {
		if BasicAuthWrapper(c.Writer, c.Request) {
			recordHandler(c.Writer, c.Request, hub)
		}
	}
}

func recordHandler(w http.ResponseWriter, r *http.Request, hub *Hub) {
	distinctIsAlive(true, hub)
	c, err := wsupgrader.Upgrade(w, r, nil)

	//sleep as it takes max pongWait seconds to detect outage
	time.Sleep(pongWait)

	outageEndTime := primitive.NewDateTimeFromTime(time.Now())

	if err != nil {
		log.Print("Failed to set websocket upgrade: ", err)
		return
	}

	//heartbeat
	go writePump(c, hub)
	go readPump(c, hub)

	//WS connection established
	go endOutage(outageEndTime)

}

func wshandler(w http.ResponseWriter, r *http.Request, hub *Hub) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("Failed to set websocket upgrade: ", err)
		return
	}
	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	//send the inital message
	message := isAliveMessgae(isAlive)
	conn.WriteMessage(1, []byte(message))

	go client.writePump()
	go client.readPump()

}
