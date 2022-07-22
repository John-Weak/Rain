package main

import (
	"github.com/gin-gonic/gin"
	"johnweak.dev/electricity-logger/src/configs"
	"johnweak.dev/electricity-logger/src/controllers"
	"johnweak.dev/electricity-logger/src/routes"
)

func main() {

	//load .env
	configs.LoadEnv()

	//init gin
	gin.SetMode(gin.ReleaseMode) //comment this line to turn on debug mode
	r := gin.Default()

	//run database
	//configs.ConnectDB()

	//for testing will be removed later
	go controllers.PeriodicallyChangeVariable()

	//routes
	routes.BaseRoute(r)
	routes.RecordsRoute(r)

	//default port 8080
	r.Run()

}
