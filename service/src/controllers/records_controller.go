package controllers

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func WS() gin.HandlerFunc {
	return func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	}
}

func WSRecord() gin.HandlerFunc {
	return func(c *gin.Context) {
		if BasicAuthWrapper(c.Writer, c.Request) {
			recordHandler(c.Writer, c.Request)
		}
	}
}

func recordHandler(w http.ResponseWriter, r *http.Request) {
	isAlive = true
	c, err := wsupgrader.Upgrade(w, r, nil)

	//sleep as it takes max pongWait seconds to detect outage
	time.Sleep(pongWait)

	outageEndTime := primitive.NewDateTimeFromTime(time.Now())

	if err != nil {
		log.Print("Failed to set websocket upgrade: ", err)
		return
	}

	//heartbeat
	go writePump(c)
	go readPump(c)

	//WS connection established
	go endOutage(outageEndTime)

}

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
