# Start from golang base image
FROM golang:alpine as builder

# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git

WORKDIR /tmp/app

COPY go.mod .
COPY go.sum .
RUN go mod download

# Copy the source from the current directory to the working Directory inside the container 
COPY . .

RUN go build -o ./out/main ./src/main.go

# Start fresh from a smaller image
FROM alpine:latest
RUN apk add ca-certificates

#CHEESE
ENV BASIC_AUTH_USERNAME=JOHN
ENV BASIC_AUTH_PASSWORD=WEAK
ENV MONGODB_URI=mongodb://localhost:27017/test

COPY --from=builder /tmp/app/out/main /app/src/main
COPY --from=builder /tmp/app/.env /app/

# Expose port 8080 to the outside world
EXPOSE 8080

ENTRYPOINT [ "/app/src/main" ]
