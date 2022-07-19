# Rain - Electricity Outage Logger

<p align="center">
<img src="https://user-images.githubusercontent.com/18065510/179569060-aca3d063-79b7-40ff-95c8-2807b03009f3.gif">
</p>

This project aims to record the timing and duration of power outage in my home.
And on later stage try to accomplish a relation between rain and outage.

## Local Setup

To install dependencies:

```bash
  cd service
  go get
```
To run Go Service:

```bash
  cd service/src
  go run .
```

## Basic Idea of Working

<p align="center">
<img src="https://user-images.githubusercontent.com/18065510/179768856-cf1fc661-fc1e-4894-ab77-eb12dc72763a.png">
</p>

## Tech

- WebSocket

  **Client:**

  - ESP8266
  - Arduino Language

  **Service:**

  - Golang
  - Gin
  - HTML/CSS

## Acknowledgements

- [Arduino/ESP8266 Websocket](https://github.com/Links2004/arduinoWebSockets)

## Useful Links

- [How to install libraries in Arduino](https://docs.arduino.cc/software/ide-v1/tutorials/installing-libraries)
