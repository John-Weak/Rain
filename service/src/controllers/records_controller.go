package controllers

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	//"johnweak.dev/electricity-logger/src/configs"
	//"johnweak.dev/electricity-logger/src/constants"
)

var isAlive = true

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
	log.Print("Connected to record handler \n")
	c, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("Failed to set websocket upgrade: ", err)
		return
	}

	//heartbeat
	go writePump(c)
	go readPump(c)

	//WS connection established
	//if no doc exists,do nothing
	//if doc exists, mark it as complete:true and update the end time, along with total outage

	//WS closed record the time in database
	//always create new doc as complete:false
	//insertOne(client, ctx, dataBase, col, doc)
	// 	/* newOutageRecord := OutageRecord{
	// 		Id:       primitive.NewObjectID(),
	// 		Start:    primitive.NewDateTimeFromTime(time.Now()),
	// 		End:      time.Now(),
	// 		Complete: false,
	// 	}
	// 	insertOne(recordsCollection, mongoCtx, newOutageRecord) */
	// }()
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

func PeriodicallyChangeVariable() {
	for {
		time.Sleep(2 * time.Second)
		isAlive = !isAlive
	}
}
