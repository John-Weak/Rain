package main

import (
	"log"
	"net/http"
	"os"
)

func BasicAuthWrapper(w http.ResponseWriter, r *http.Request) bool {

	username := os.Getenv("BASIC_AUTH_USERNAME")
	password := os.Getenv("BASIC_AUTH_PASSWORD")

	u, p, ok := r.BasicAuth()
	if !ok {
		log.Println("Error parsing basic auth")
		w.WriteHeader(401)
		return false
	}
	if u != username {
		log.Printf("Username provided is incorrect: %s\n", u)
		w.WriteHeader(401)
		return false
	}
	if p != password {
		log.Printf("Password provided is incorrect: %s\n", u)
		w.WriteHeader(401)
		return false
	}

	return true
}
