package controllers

import (
	"log"
	"net/http"

	"johnweak.dev/electricity-logger/src/configs"
)

func BasicAuthWrapper(w http.ResponseWriter, r *http.Request) bool {

	username, password := configs.EnvBasicUsernameAndPassword()

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
