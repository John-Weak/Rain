# Start from golang base image
FROM golang:alpine as builder

# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

# Copy the source from the current directory to the working Directory inside the container 
COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

# Build the Go app
WORKDIR /app/src
RUN go build -o main .


ENTRYPOINT [ "/app/src/main" ]

# TODO:Optimise