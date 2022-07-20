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

void blink(uint8_t cycles = 2, unsigned int duration = 1000)
{
  for (; cycles > 0; cycles--)
  {
    digitalWrite(LED_BUILTIN, LOW); // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because it is active low on the ESP-01)
    delay(duration);
    digitalWrite(LED_BUILTIN, HIGH); // Turn the LED off by making the voltage HIGH
    delay(duration);
  }
}

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case WStype_DISCONNECTED:
    USE_SERIAL.printf("[WSc] Disconnected!\n");
    blink(3, 500);
    break;
  case WStype_CONNECTED:
  {
    USE_SERIAL.printf("[WSc] Connected to url: %s\n", payload);
    digitalWrite(LED_BUILTIN, HIGH);
  }
  break;
  case WStype_TEXT:
    USE_SERIAL.printf("[WSc] get text: %s\n", payload);
    break;
  case WStype_BIN:
    blink();
    USE_SERIAL.printf("[WSc] get binary length: %u\n", length);
    hexdump(payload, length);
    // send data to server in future?
    // webSocket.sendBIN(payload, length);
    break;
  default:
    blink(5, 100);
    break;
  }
}

void setup()
{
  // initialize the serial with 115200 baud for debugging
  USE_SERIAL.begin(115200);
  USE_SERIAL.setDebugOutput(true);

  pinMode(LED_BUILTIN, OUTPUT); // Initialize the LED_BUILTIN pin as an output

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
    digitalWrite(LED_BUILTIN, LOW); // light on until wifi is connectedd
    delay(100);
  }
  digitalWrite(LED_BUILTIN, HIGH); // light off

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
