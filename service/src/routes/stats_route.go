package routes

import (
	"github.com/gin-gonic/gin"
	"johnweak.dev/electricity-logger/src/controllers"
)

func StatsRoute(r *gin.Engine) {
	r.GET("/latest", controllers.LatestStat())

	r.GET("/greatest", controllers.GreatestStat())
	
	r.GET("/between", controllers.BetweenStat())

}
