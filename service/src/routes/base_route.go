package routes

import (
	"github.com/gin-gonic/gin"
	"johnweak.dev/electricity-logger/src/controllers"
)

func BaseRoute(r *gin.Engine) {
	r.GET("/", controllers.Base())
}
