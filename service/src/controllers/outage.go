package controllers

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"johnweak.dev/electricity-logger/src/configs"
	"johnweak.dev/electricity-logger/src/constants"
	"johnweak.dev/electricity-logger/src/models"
)

var outageRecordsCollection *mongo.Collection = nil

func getOutageRecordsCollection() *mongo.Collection {
	if outageRecordsCollection == nil {
		outageRecordsCollection = configs.GetMongoCollection(configs.MongoClient,
			constants.DATABASE, constants.RECORDS_COLLECTION)
	}
	return outageRecordsCollection
}

func startOutage() {
	startOutageTime := primitive.NewDateTimeFromTime(time.Now())
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	//always create new doc
	//insertOne(client, ctx, dataBase, col, doc)
	newOutageRecord := models.OutageRecord{
		Start: startOutageTime,
		End:   0, //will set dateTime to 1970-01-01 00:00:00 +0000 UTC
		Total: 0,
	}

	_, err := getOutageRecordsCollection().InsertOne(ctx, newOutageRecord)
	if err != nil {
		panic(err)
	}
}

func endOutage(outageEndTime primitive.DateTime) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	//if no doc exists,do nothing
	//if doc exists, update the end time, along with total outage
	var outage models.OutageRecord

	err := getOutageRecordsCollection().FindOne(ctx, bson.M{"total": 0}).Decode(&outage)
	if err != nil && err != mongo.ErrNoDocuments {
		panic(err)
	}
	if err != mongo.ErrNoDocuments {
		totalTime := int32(outageEndTime.Time().Unix() - outage.Start.Time().Unix())
		update := bson.M{"end": outageEndTime, "total": totalTime}
		updated, updateError := getOutageRecordsCollection().UpdateByID(ctx, outage.Id, bson.M{"$set": update})
		if updateError != nil || updated.MatchedCount != 1 {
			panic(updateError)
		}
	}
}
