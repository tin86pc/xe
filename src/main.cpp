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
#include "vl.h"
#include "sk.h"

void startWifi()
{

  String tenWifiPhat = "TP-LINK";
  String passWifiPhat = "12345678";

  String tenWifiBat = "Tuyen T1";
  String passWifiBat = "0978333563";

  String s = getFile("setting.json");

  tenWifiPhat = tachChuoi(s, '|', 0);
  passWifiPhat = tachChuoi(s, '|', 1);

  tenWifiBat = tachChuoi(s, '|', 2);
  passWifiBat = tachChuoi(s, '|', 3);

  // Serial.println(tenWifiPhat);
  // Serial.println(passWifiPhat);
  // Serial.println(tenWifiBat);
  // Serial.println(passWifiBat);

  WiFi.mode(WIFI_AP_STA);

  WiFi.softAP(tenWifiPhat);
  WiFi.begin(tenWifiBat, passWifiBat);

  // nếu lỗi kết nối sẽ phát chế độ AP
  if (WiFi.waitForConnectResult() != WL_CONNECTED)
  {
    WiFi.softAPdisconnect();
    WiFi.disconnect();

    WiFi.mode(WIFI_AP);
    delay(100);
    WiFi.softAP(tenWifiPhat);
    Serial.println(WiFi.softAPIP());
  }
  else
  {
    Serial.print("Ket noi wifi: ");
    Serial.println(tenWifiBat);
    Serial.print("Dia chi IP: ");
    Serial.println(WiFi.localIP());
  }

  u.setup(&sv); // nạp chương trình qua wifi
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

  sv.on("/r", []()
        { ESP.restart(); });

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
              "<button onclick='if(confirm(`format`)==true)window.location.href=`/x`'>Format</button>"
              "<br>"
              "<br>"
              "<a href='/s'>Cài đặt</a>"
              "<br>"
              "<br>"
              "<form method='POST' action='/u' enctype='multipart/form-data'>"
                "<input type='file' name='chon file' multiple>"
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
                  if (lf == ".json")
                  {
                    sv.send(200, "application/json", getFile(nf));
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

  startLittleFS();
  startWifi();

  startServer();
  startWebSocket();
  startServo();
}

void loop()
{
  webSocket.loop();
  sv.handleClient();

  nhay(1000, led);
}
