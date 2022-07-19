#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WebSocketsClient.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;
WebSocketsClient webSocket;

// Replace with your network credentials
const char *ssid = "SSID";
const char *password = "PASSWORD";
// Set ws host,url,port
const char *host = "192.168.1.2";
const uint16_t port = 8080;
const char *url = "/ws";

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
  USE_SERIAL.printf("%s\n", payload);
}

void setup()
{
  // initialize the serial with 115200 baud for debugging
  USE_SERIAL.begin(115200);
  USE_SERIAL.setDebugOutput(true);

  // waiting for boot
  for (uint8_t t = 4; t > 0; t--)
  {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  // Connect to local WiFi
  WiFiMulti.addAP(ssid, password);

  // WiFi.disconnect();
  while (WiFiMulti.run() != WL_CONNECTED)
  {
    delay(100);
  }

  webSocket.begin(host, port, url);

  // WebSocket event handler
  webSocket.onEvent(webSocketEvent);

  // if connection failed retry every 5s
  webSocket.setReconnectInterval(5000);
}

void loop()
{
  webSocket.loop(); // Keep the socket alive
}
