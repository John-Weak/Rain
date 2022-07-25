package configs

import (
	"context"
	"log"
	"time"

	//"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() (*mongo.Client, context.Context, context.CancelFunc, error) {
	print("Connecting to MongoDB... \n")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(EnvMongoURI()))

	//ping the database
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	print("Connected to MongoDB \n")
	MongoClient = client
	return client, ctx, cancel, err
}

func CloseMongo(client *mongo.Client, ctx context.Context, cancel context.CancelFunc) {
	defer cancel()
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()
}

func GetMongoCollection(client *mongo.Client, dataBase, col string) *mongo.Collection {
	return client.Database(dataBase).Collection(col)
}

// func insertOne(mongoCollection *mongo.Collection, ctx context.Context, doc interface{}) (*mongo.InsertOneResult, error) {
// 	result, err := mongoCollection.InsertOne(ctx, doc)
// 	return result, err
// }

// func findOne(mongoCollection *mongo.Collection, ctx context.Context, doc interface{}) bson.M {
// 	var result bson.M = bson.M{}
// 	err := mongoCollection.FindOne(ctx, doc).Decode(result)
// 	if err != nil && err != mongo.ErrNoDocuments {
// 		panic(err)
// 	}
// 	return result
// }

// func query(mongoCollection *mongo.Collection, ctx context.Context, query, field interface{}) (result *mongo.Cursor, err error) {
// 	//returns a mongo.cursor based on query and field.
// 	result, err = mongoCollection.Find(ctx, query, options.Find().SetProjection(field))
// 	return
// }
