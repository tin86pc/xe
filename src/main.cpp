//https://tttapa.github.io/ESP8266/Chap14%20-%20WebSocket.html
#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPUpdateServer.h> // nạp chương trình qua wifi

#include "data.h"

#include <FS.h>

ESP8266WebServer sv(80);
ESP8266HTTPUpdateServer u; // nạp chương trình qua wifi


bool ledState = 0;
const int ledPin = 2;


void ktWeb(){
sv.on("/", []()
        {
          Serial.println("trang chu");
          sv.send(200, "text/html", getData("index.html") ); });

  sv.on("/script", []()
        {
          Serial.println("script.js");
          sv.send(200, "text/javascript", getData("script.js") ); });

  sv.on("/style", []()
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

}


void setup()
{
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP("abc", "12345678");
  WiFi.begin("Tuyen T1", "0978333563");

  while (WiFi.waitForConnectResult() != WL_CONNECTED)
  {
    delay(100);
  }
  u.setup(&sv); // nạp chương trình qua wifi

  Serial.begin(115200);

  Serial.println();
  Serial.println("Ket noi wifi: Tuyen T1 dia chi IP");
  Serial.println(WiFi.localIP());

  if (!SPIFFS.begin())
  {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  ktWeb();

  sv.begin();

 

}

void loop()
{
  sv.handleClient();
}
