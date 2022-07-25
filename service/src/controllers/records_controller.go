package controllers

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	//"johnweak.dev/electricity-logger/src/configs"
	//"johnweak.dev/electricity-logger/src/constants"
)

//var recordsCollection = configs.GetCollection(configs.DBClient, constants.RECORDS_COLLECTION)

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
	//sleep as it takes max pongWait to detect outage
	duration := pongWait
	time.Sleep(duration)
	outageEndTime := primitive.NewDateTimeFromTime(time.Now())

	c, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("Failed to set websocket upgrade: ", err)
		return
	}

	//heartbeat
	go writePump(c)
	go readPump(c)

	//WS connection established
	log.Print("WS connection established \n")
	go endOutage(outageEndTime)

}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("Failed to set websocket upgrade: ", err)
		return
	}

	message := "none"
	lastisAlive := IsAlive
	for {
		if message == "none" || lastisAlive != IsAlive {
			if IsAlive {
				message = "alive"
			} else {
				message = "dead"
			}
			lastisAlive = IsAlive
			conn.WriteMessage(1, []byte(message))
		}
	}
}
