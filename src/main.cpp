// https://tttapa.github.io/ESP8266/Chap14%20-%20WebSocket.html
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPUpdateServer.h> // nạp chương trình qua wifi
#include <WebSocketsServer.h>

ESP8266WebServer sv(80);
ESP8266HTTPUpdateServer u;      // nạp chương trình qua wifi
WebSocketsServer webSocket(81); // create a websocket server on port 81

#include "ham.h"
#include "data.h"
#include "sk.h"

void startWifi()
{
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP("abc", "12345678");
  WiFi.begin("Tuyen T1", "0978333563");
  // WiFi.begin("Mercusys", "mot2345678");
  while (WiFi.waitForConnectResult() != WL_CONNECTED)
  {
    delay(100);
  }

  u.setup(&sv); // nạp chương trình qua wifi
  Serial.println("Ket noi wifi: Tuyen T1 dia chi IP");
  Serial.println(WiFi.localIP());
}

void startServer()
{
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

  sv.on("/x", []()
        {
          Serial.println("Format...");
          SPIFFS.format();
          sv.send(200,"text/html","Format ok."); });

  sv.on("/s", []()
        { sv.send(200, "text/html", "setting"); });

  // Tạo form nhận file
  sv.on(
      "/u", HTTP_ANY, []()
      {   
        Serial.println("u");
          sv.send(200, "text/html", 
          "<html>"
            "<head>"
              "<meta charset='UTF-8'>"
              "<title>"
              "Cập nhật html"
              "</title>"
            "</head>"
            "<body>"
              "<br>"
              "<a href='/'>Trang chủ</a>"
              "<br>"
              "<br>"
              "<a href='/update'>Update Firmware</a>"
              "<br>"
              "<br>"
              "<a href='/x'>Format</a>"
              "<br>"
              "<br>"
              "<form method='POST' action='/u' enctype='multipart/form-data'>"
                "<input type='file' name='chon file'>"
                "<input type='submit' value='Gửi đi'>"
              "</form>"
            "</body>"
          "</html>"
          ); },
      []()
      {
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

  sv.onNotFound([]()
                {
                  String uri = sv.uri();
                  String nf = uri.substring(1);
                  String lf = "";                
                  int vt = nf.indexOf(".");
                  if (vt >= 0)
                  {
                    lf = nf.substring(vt, nf.length());
                  }
                  if (lf == ".js")
                  {
                    sv.send(200, "application/javascript", getData(nf));
                  }
                  else
                  {
                    sv.send(404,"text/html","Error 404 NOT FOUND");
                  } });

  sv.begin();
}

#define LED_RED 15 // specify the pins with an RGB LED connected
#define LED_GREEN 12
#define LED_BLUE 13

void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t lenght)
{
  if (type == WStype_DISCONNECTED)
  {
    Serial.printf("[%u] Disconnected!\n", num);
  }

  if (type == WStype_CONNECTED)
  {
    IPAddress ip = webSocket.remoteIP(num);
    Serial.printf("ket noi voi [%u] tai dia chi %d.%d.%d.%d%s\n", num, ip[0], ip[1], ip[2], ip[3], payload);
    webSocket.sendTXT(num, "da ket noi");
  }

  if (type == WStype_TEXT)
  {
    Serial.printf("[%u] get Text: %s\n", num, payload);
    String echoMessage = "Received:  " + String((char *)payload);
    xulylenh(String((char *)payload));
    webSocket.sendTXT(num, echoMessage);
  }
}

void startWebSocket()
{                                    // Start a WebSocket server
  webSocket.begin();                 // start the websocket server
  webSocket.onEvent(webSocketEvent); // if there's an incomming websocket message, go to function 'webSocketEvent'
  Serial.println("WebSocket server started.");
}

void led()
{
  pinMode(2, OUTPUT);
  digitalWrite(2, digitalRead(2));

  Serial.println(".");
  webSocket.broadcastTXT("."); // send data to all connected clients
}

void setup()
{
  Serial.begin(115200);
  Serial.println();

  startWifi();
  startSPIFFS();
  startWebSocket();
  startServer();
}

void loop()
{
  webSocket.loop();
  sv.handleClient();

  nhay(1000, led);
}
