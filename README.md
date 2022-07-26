# Rain - Electricity Outage Logger

<p align="center">
<img  src="https://user-images.githubusercontent.com/18065510/179917848-ceeceda2-df99-4c05-8d31-cb106057249c.gif">
</p>

This project aims to record the timing and duration of power outage in my home.
And on later stage try to accomplish a relation between rain and outage .

PS: Work in progress and not yet deployed.

## Why does this project exists?

**Information is power**

There is no publicly accessible information regarding the timing and duration of power outage in my area.

## Local Setup

### **Important**

Do not forget to change the password, host, url etcetra from the client.ino file.

Just search for the word _CHEESE_ and it will take you to neccessary places.

Also do not forget to update the .env .

To install dependencies:

---

```bash
  cd service
  go get
```

To run Go Service:

```bash
  cd service/src
  go run .
```

## What does LED signals mean?

| LED STATUS         | Description                  |
| :----------------- | :--------------------------- |
| Constant **ON**    | Waiting to connect to WIFI.  |
| BLINKS **3** times | Web Socket disconnected.     |
| BLINKS **5** times | Fatal error has occured.     |
| Constant **OFF**   | Everything is working fine . |

## Basic Idea of Working

- Websocket hearbeat is used to monitor if the client is alive.

<p align="center">
<img width=500px src="https://user-images.githubusercontent.com/18065510/179768856-cf1fc661-fc1e-4894-ab77-eb12dc72763a.png">
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
