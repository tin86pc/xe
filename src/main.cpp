// https://tttapa.github.io/ESP8266/Chap14%20-%20WebSocket.html
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPUpdateServer.h> // nạp chương trình qua wifi
#include <WebSocketsServer.h>
#include <EEPROM.h>
#include <Arduino_JSON.h>

ESP8266WebServer sv(80);
ESP8266HTTPUpdateServer u;      // nạp chương trình qua wifi
WebSocketsServer webSocket(81); // create a websocket server on port 81

String tenWifiPhat = "abc";
String passWifiPhat = "12345678";

String tenWifiBat = "Tuyen T1";
String passWifiBat = "0978333563";

#include "ham.h"
#include "data.h"
#include "vl.h"
#include "sk.h"


void startWifi()
{
  
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP(tenWifiPhat, passWifiPhat);
  WiFi.begin(tenWifiBat, passWifiBat);

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
          sv.send(200, "text/html", getFile("index.html") ); });

  sv.on("/script.js", []()
        {
          Serial.println("script.js");
          sv.send(200, "text/javascript", getFile("script.js") ); });

  sv.on("/style.css", []()
        {
          Serial.println("style.css");
          sv.send(200, "text/css", getFile("style.css") ); });

  sv.on("/x", []()
        {
          Serial.println("Format...");
          fomatAll();
          sv.send(200,"text/html","Format ok."); });

  sv.on("/s", []()
        { 
          sv.send(200, "text/html", getFile("setting.html"));  
          Serial.println("Cai dat"); });

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
          clearFile(file.filename);
        }
        else if (file.status == UPLOAD_FILE_WRITE)
        {
          Serial.println("dang gui");
          saveFile(file.filename, file.buf, file.currentSize);
        }
        else if (file.status == UPLOAD_FILE_END)
        {
          Serial.println("gui file song");
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
                    sv.send(200, "application/javascript", getFile(nf));
                  }
                  else
                  {
                    sv.send(404,"text/html","Error 404 NOT FOUND");
                  } });

  sv.begin();
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
  startLittleFS();
  startWebSocket();
  startServer();
  startServo();
  String s = getFile("setting.json");
  Serial.println(s);
}

void loop()
{
  webSocket.loop();
  sv.handleClient();

  nhay(1000, led);
}
