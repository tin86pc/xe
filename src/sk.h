
void batdauketnoi()
{
  Serial.print("bat dau ket noi");
}

void xulylenh(String s)
{
  String sv = s.substring(1);
  int iv = sv.toInt();
  Serial.print(iv);

  if (s.startsWith("l"))
  {
  }
  if (s.startsWith("g"))
  {
  }
  if (s.startsWith("v"))
  {
    setServo(iv);
  }
}

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

    batdauketnoi();
  }

  if (type == WStype_TEXT)
  {
    Serial.printf("user [%u] gui: %s\n", num, payload);
    String sPayLoad = String((char *)payload);
    String echoMessage = "echo> " + sPayLoad;
    webSocket.sendTXT(num, echoMessage);

    xulylenh(sPayLoad);
  }
}

void startWebSocket()
{
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
  Serial.println("WebSocket server started.");
}
