package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Base() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.String(http.StatusOK, "Hello From 🌧️")
	}
}
