package routes

import (
	"github.com/gin-gonic/gin"
	"johnweak.dev/electricity-logger/src/controllers"
)

func BaseRoute(r *gin.Engine) {
	r.LoadHTMLFiles("./views/base_index.html")
	r.GET("/", controllers.Base())
}
