package controllers

import (
	"github.com/gin-gonic/gin"
)

func Base() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.HTML(200, "base_index.html", nil)
	}
}
