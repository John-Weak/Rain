package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OutageRecord struct {
	Id    primitive.ObjectID `bson:"_id,omitempty"`
	Start primitive.DateTime `bson:"start"`
	End   primitive.DateTime `bson:"end,"`
	Total int32              `bson:"total"`
}
