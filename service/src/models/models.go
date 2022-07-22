package main

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OutageRecord struct {
	Id    primitive.ObjectID `bson:"id,omitempty"`
	Start primitive.DateTime `bson:"start"`
	End   primitive.DateTime `bson:"end,"`
	//PEnd     *primitive.DateTime `bson:"end,"`
	Complete bool `bson:"complete"`
}

// func (u *OutageRecord) GetBSON() (interface{}, error) {
// 	if u.End.IsZero() {
// 		u.PEnd = nil
// 	} else {
// 		u.PEnd = &u.End
// 	}
// 	return u, nil
// }

// func (u *OutageRecord) SetBSON(raw bson.Raw) (err error) {
// 	if err = bson.Unmarshal(raw, u); err != nil {
// 		return
// 	}
// 	if u.PEnd == nil {
// 		u.End = time.Time{}
// 	} else {
// 		u.End = *u.PEnd
// 	}
// 	return
// }
