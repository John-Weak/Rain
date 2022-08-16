# Rain - Electricity Outage Logger

<p align="center">
<img  src="https://user-images.githubusercontent.com/18065510/184974701-076eaccf-914a-4080-9d92-5ae9fe3df1d1.gif">
</p>

This project aims to record the timing and duration of power outage in my home.

~~PS: Work in progress and not yet deployedNow gathering data for few weeks,till then only [live](https://rain.johnweak.dev/) status of outage will be shown.~~.

---

## Why does this project exists?

**Information is power**

There is no publicly accessible information regarding the timing and duration of power outage in my area.

---

## Local Setup

### **Important**

Do not forget to change the password, host, url etcetra from the client.ino file.

Just search for the word _CHEESE_ and it will take you to neccessary places.

Also do not forget to update the .env .


### Service
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

### App
To install dependencies:

```bash
  cd app
  pnpm install
```

To run Next.js app:

```bash
  cd app
  pnpm run dev
```

---

## What does LED signals mean?

<img align="right" width="300" height="200" src="https://user-images.githubusercontent.com/18065510/184974035-c4804125-b380-4409-9dd0-f86c1799dd12.gif">

| LED STATUS         | Description                  |
| :----------------- | :--------------------------- |
| Constant **ON**    | Waiting to connect to WIFI.  |
| BLINKS **3** times | Web Socket disconnected.     |
| BLINKS **5** times | Fatal error has occured.     |
| Constant **OFF**   | Everything is working fine . |

---

## Basic Idea of Working

- Websocket hearbeat is used to monitor if the client is alive.
- Basic HTTP auth is used to authorize the client.
- If the client disconnects an outage is registered.

---

## Tech

- WebSocket
- Basic Http Authentication

  **Client:**

  - ESP8266
  - Arduino Language

  **Service:**

  - Golang
  - Gin
  - Gorilla

  **App**

  - Next.js
  - TailwindCSS
  - TypeScript
  - HighCharts

  **Deployment**

  - Docker on private server (Service)
  - Vercel (App)

---

## Acknowledgements

- [Arduino/ESP8266 Websocket](https://github.com/Links2004/arduinoWebSockets)

---

## Useful Links

- [How to install libraries in Arduino](https://docs.arduino.cc/software/ide-v1/tutorials/installing-libraries)
