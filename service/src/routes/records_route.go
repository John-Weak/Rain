package routes

import (
	"github.com/gin-gonic/gin"
	"johnweak.dev/electricity-logger/src/controllers"
)

func RecordsRoute(r *gin.Engine) {

	r.GET("/ws", controllers.WS())

	r.GET("/wsRecord", controllers.WSRecord())
}
