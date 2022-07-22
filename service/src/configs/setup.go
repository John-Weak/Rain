package configs

import (
	"go.mongodb.org/mongo-driver/mongo"
	"johnweak.dev/electricity-logger/src/constants"
)

func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database(constants.DATABASE).Collection(collectionName)

	return collection
}

/* //connect to mongoDB
mongoClient, mongoCtx, mongoCancel, mongoErr := connectMongo(os.Getenv("MONGODB_URI"))
if mongoErr != nil {
	panic(mongoErr)
}
defer closeMongo(mongoClient, mongoCtx, mongoCancel)

//connect to database
database := mongoClient.Database(DATABASE)

//connect to collection
*/
