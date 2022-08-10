package main

import (
	"github.com/gin-gonic/gin"
	"johnweak.dev/electricity-logger/src/configs"
	"johnweak.dev/electricity-logger/src/routes"
)

func main() {

	//load .env
	configs.LoadEnv()

	//init gin
	gin.SetMode(gin.ReleaseMode) //comment this line to turn on debug mode
	r := gin.Default()

	//run database
	configs.ConnectDB()

	//routes
	routes.BaseRoute(r)
	routes.RecordsRoute(r)
	routes.StatsRoute(r)

	//default port 8080
	r.Run()

}
