//https://tttapa.github.io/ESP8266/Chap14%20-%20WebSocket.html
#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPUpdateServer.h> // nạp chương trình qua wifi

#include <WebSocketsServer.h>
#include "data.h"

ESP8266WebServer sv(80);
ESP8266HTTPUpdateServer u; // nạp chương trình qua wifi
WebSocketsServer webSocket(81);    // create a websocket server on port 81


void startWifi(){
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP("abc", "12345678");
  WiFi.begin("Tuyen T1", "0978333563");
  while (WiFi.waitForConnectResult() != WL_CONNECTED)
    {
      delay(100);
    }
  u.setup(&sv); // nạp chương trình qua wifi  
  Serial.println("Ket noi wifi: Tuyen T1 dia chi IP");
  Serial.println(WiFi.localIP());
}

void startServer(){
sv.on("/", []()
        {
          Serial.println("index.html");
          sv.send(200, "text/html", getData("index.html") ); });

  sv.on("/script.js", []()
        {
          Serial.println("script.js");
          sv.send(200, "text/javascript", getData("script.js") ); });

  sv.on("/style.css", []()
        {
          Serial.println("style.css");
          sv.send(200, "text/css", getData("style.css") ); });

  // Tạo form nhận file
  sv.on("/nhan-html", HTTP_ANY,
      [](){
          Serial.println("trang nhan-html");
          sv.send(200, "text/html", 
          "<html>"
            "<head>"
              "<meta charset='UTF-8'>"
              "<title>"
              "Cập nhật html"
              "</title>"
            "</head>"
            "<body>"
            "<a href='/'>Trang chủ</a>"
            "<br>"
            "<a href='/update'>Update Firmware</a>"
            "<br>"
              "<form method='POST' action='/nhan-html' enctype='multipart/form-data'>"
                "<input type='file' name='chon file'>"
                "<input type='submit' value='Gửi đi'>"
              "</form>"
            "</body>"
          "</html>"
          ); },
      [](){
        HTTPUpload &file = sv.upload();
        if (file.status == UPLOAD_FILE_START)
        {
          Serial.println("ghi file " + file.filename);
          clearData(file.filename);
        }
        else if (file.status == UPLOAD_FILE_WRITE)
        {
          Serial.println("dang gui");
          saveData(file.filename, file.buf, file.currentSize);
        }
        else if (file.status == UPLOAD_FILE_END)
        {
          Serial.println("gui song");
        }
      });




      sv.begin();
}

#include <ESP8266mDNS.h>
const char* mdnsName = "abc"; // Domain name for the mDNS responder
void startMDNS() { // Start the mDNS responder
  MDNS.begin(mdnsName);                        // start the multicast domain name server
  Serial.print("mDNS responder started: http://");
  Serial.print(mdnsName);
  Serial.println(".local");
}

bool rainbow = false;             // The rainbow effect is turned off on startup

unsigned long prevMillis = millis();
int hue = 0;

#define LED_RED     15            // specify the pins with an RGB LED connected
#define LED_GREEN   12
#define LED_BLUE    13

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t lenght) { // When a WebSocket message is received
  switch (type) {
    case WStype_DISCONNECTED:             // if the websocket is disconnected
      Serial.printf("[%u] Disconnected!\n", num);
      break;
    case WStype_CONNECTED: {              // if a new websocket connection is established
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);
        rainbow = false;                  // Turn rainbow off when a new connection is established
        webSocket.sendTXT(num,"Connected");         
      }
      break;
    case WStype_TEXT:                     // if new text data is received
      Serial.printf("[%u] get Text: %s\n", num, payload);
      if (payload[0] == '#') {            // we get RGB data
        uint32_t rgb = (uint32_t) strtol((const char *) &payload[1], NULL, 16);   // decode rgb data
        int r = ((rgb >> 20) & 0x3FF);                     // 10 bits per color, so R: bits 20-29
        int g = ((rgb >> 10) & 0x3FF);                     // G: bits 10-19
        int b =          rgb & 0x3FF;                      // B: bits  0-9

        analogWrite(LED_RED,   r);                         // write it to the LED output pins
        analogWrite(LED_GREEN, g);
        analogWrite(LED_BLUE,  b);
      } else if (payload[0] == 'R') {                      // the browser sends an R when the rainbow effect is enabled
        rainbow = true;
      } else if (payload[0] == 'N') {                      // the browser sends an N when the rainbow effect is disabled
        rainbow = false;
      }

      String echoMessage = "Received:  " + String((char*)payload);
      webSocket.sendTXT(num, echoMessage);

      break;
  }
}

void startWebSocket() { // Start a WebSocket server
  webSocket.begin();                          // start the websocket server
  webSocket.onEvent(webSocketEvent);          // if there's an incomming websocket message, go to function 'webSocketEvent'
  Serial.println("WebSocket server started.");
}


#define ledPin 2
int ledState = LOW;            
long int previousMillis = 0;     

long interval = 1000;          
void nhayled(){
  long int currentMillis = millis();
 
  if(currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;  
    if (ledState == LOW)
      ledState = HIGH;
    else
      ledState = LOW;

    digitalWrite(ledPin, ledState);
    Serial.println(".");
  }
}



void setup()
{    
  Serial.begin(115200);
  Serial.println();

  startWifi();
  startSPIFFS();
  startWebSocket();            // Start a WebSocket server
  startMDNS();
  startServer();
}

void loop()
{
  webSocket.loop();  
  sv.handleClient();
  nhayled();
}



