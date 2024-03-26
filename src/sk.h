void capNhat()
{
  String nd = "H" + huong;
  webSocket.broadcastTXT(nd);

  // tenWifiPhat = readEEPROM(0, 32);
  // passWifiPhat = readEEPROM(32, 64);
  // tenWifiBat = readEEPROM(64, 96);
  // passWifiBat = readEEPROM(96, 128);

  // nd = "s" + tenWifiPhat + "|" + passWifiPhat + "|" + tenWifiBat + "|" + passWifiBat + "|";

  // webSocket.broadcastTXT(nd);
  // Serial.println(nd);
}

void batdauketnoi()
{
  Serial.println("bat dau ket noi. ");
  webSocket.broadcastTXT("bat dau ket noi. ");

  capNhat();
}

void xulylenh(String s)
{
  String sv = s.substring(1);
  int iv = sv.toInt();

  if (s.startsWith("l"))
  {
    if (iv == 0)
    {
      huong = "P";
    }
    if (iv == 1)
    {
      huong = "R";
    }
    if (iv == 2)
    {
      huong = "N";
    }
    if (iv == 3)
    {
      huong = "D";
    }
    capNhat();
  }

  if (s.startsWith("g"))
  {
    datTocDo(iv);
  }

  if (s.startsWith("v"))
  {
    setServo(iv);
  }

  if (s.startsWith("s"))
  {
    // lưu vào eeprom
    String tenWifiPhat = tachChuoi(sv, '|', 0);
    String passWifiPhat = tachChuoi(sv, '|', 1);
    String tenWifiBat = tachChuoi(sv, '|', 2);
    String passWifiBat = tachChuoi(sv, '|', 3);

    writeEEPROM(0, tenWifiPhat);
    writeEEPROM(32, passWifiPhat);

    writeEEPROM(64, tenWifiBat);
    writeEEPROM(96, passWifiBat);
    EEPROM.commit();
    Serial.println("luu vao eeprom ok");
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
