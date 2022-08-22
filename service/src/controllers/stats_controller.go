package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"johnweak.dev/electricity-logger/src/models"
)

type LatestStatParam struct {
	Count uint32 `form:"count" binding:"required"`
}

func LatestStat() gin.HandlerFunc {
	return func(c *gin.Context) {

		var params LatestStatParam
		if c.ShouldBindQuery(&params) != nil {
			c.JSON(400, gin.H{"msg": "count of type uint required"})
			return
		}
		if params.Count < 1 || params.Count > 100 {
			c.JSON(400, gin.H{"msg": "count must be between 1 and 100"})
			return
		}

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var outages []models.OutageRecord

		results, err := getOutageRecordsCollection().Find(ctx, bson.M{},
			options.Find().SetSort(bson.D{{Key: "start", Value: -1}}),
			options.Find().SetLimit(int64(params.Count)))

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
	Count uint32 `form:"count" binding:"required"`
}

func GreatestStat() gin.HandlerFunc {
	return func(c *gin.Context) {

		var params GreatestStatParam
		if c.ShouldBindQuery(&params) != nil {
			c.JSON(400, gin.H{"msg": "count of type uint required"})
			return
		}
		if params.Count < 1 || params.Count > 100 {
			c.JSON(400, gin.H{"msg": "count must be between 1 and 100"})
			return
		}

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var outages []models.OutageRecord

		results, err := getOutageRecordsCollection().Find(ctx, bson.M{},
			options.Find().SetSort(bson.D{{Key: "total", Value: -1}}),
			options.Find().SetLimit(int64(params.Count)))

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

type BetweenStatParam struct {
	From uint32 `form:"from" binding:"required"`
	To   uint32 `form:"to" binding:"required"`
}

func BetweenStat() gin.HandlerFunc {
	return func(c *gin.Context) {

		var params BetweenStatParam
		if c.ShouldBindQuery(&params) != nil {
			c.JSON(400, gin.H{"msg": "params from and to of type UTC seconds required"})
			return
		}
		if params.From > params.To {
			c.JSON(400, gin.H{"msg": "from must be less than to"})
			return
		}
		if params.To-params.From > 60*60*24*183 {
			c.JSON(400, gin.H{"msg": "from and to must be <= 6 months"})
			return
		}

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var outages []models.OutageRecord
		from := primitive.NewDateTimeFromTime(time.Unix(int64(params.From), 0))
		to := primitive.NewDateTimeFromTime(time.Unix(int64(params.To), 0))

		results, err := getOutageRecordsCollection().Find(ctx,
			bson.M{
				"start": bson.M{
					"$gte": from,
					"$lte": to,
				}},
			options.Find().SetSort(bson.D{{Key: "start", Value: 1}}))

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
