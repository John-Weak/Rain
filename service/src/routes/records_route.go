package routes

import (
	"github.com/gin-gonic/gin"
	"johnweak.dev/electricity-logger/src/controllers"
)

func RecordsRoute(r *gin.Engine) {
	hub := controllers.NewHub()
	go hub.Run()

	r.GET("/ws", controllers.WS(hub))

	r.GET("/wsRecord", controllers.WSRecord(hub))
}
