package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"johnweak.dev/electricity-logger/src/models"
)

type LatestStatParam struct {
	Count int64 `form:"count" binding:"required"`
}

func LatestStat() gin.HandlerFunc {
	return func(c *gin.Context) {
		var params LatestStatParam
		if c.ShouldBindQuery(&params) != nil {
			c.JSON(400, gin.H{"msg": "count of type int required"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var outages []models.OutageRecord

		results, err := getOutageRecordsCollection().Find(ctx, bson.M{}, options.Find().SetSort(bson.D{{Key: "start", Value: -1}}), options.Find().SetLimit(params.Count))

		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}
		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleOutage models.OutageRecord
			if err = results.Decode(&singleOutage); err != nil {
				c.JSON(http.StatusInternalServerError, err)
			}

			outages = append(outages, singleOutage)
		}
		c.JSON(http.StatusOK, outages)
	}
}

type GreatestStatParam struct {
	Count int64 `form:"count" binding:"required"`
}

func GreatestStat() gin.HandlerFunc {
	return func(c *gin.Context) {
		var params GreatestStatParam
		if c.ShouldBindQuery(&params) != nil {
			c.JSON(400, gin.H{"msg": "count of type int required"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var outages []models.OutageRecord

		results, err := getOutageRecordsCollection().Find(ctx, bson.M{}, options.Find().SetSort(bson.D{{Key: "total", Value: -1}}), options.Find().SetLimit(params.Count))

		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}
		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleOutage models.OutageRecord
			if err = results.Decode(&singleOutage); err != nil {
				c.JSON(http.StatusInternalServerError, err)
			}

			outages = append(outages, singleOutage)
		}
		c.JSON(http.StatusOK, outages)
	}
}
