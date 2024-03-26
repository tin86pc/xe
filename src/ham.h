typedef void (*ConTroHam)();

unsigned long previousMillis = 0;
void nhay(unsigned long interval, ConTroHam func)
{
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis > interval)
  {
    previousMillis = currentMillis;
    func();
  }
}

//  nhay(1000, led);
// void led()
// {
//   pinMode(2, OUTPUT);
//   digitalWrite(2, digitalRead(2));

//   Serial.println(".");
//   webSocket.broadcastTXT("."); // send data to all connected clients
// }

String tachChuoi(String ss, char kt, int vt)
{
  int v = 0;
  int s = 0;
  for (unsigned int i = 0; i <= ss.length(); i++)
  {
    if (ss[i] == kt)
    {
      if (v == vt)
      {
        return ss.substring(s, i);
      }
      s = i + 1;
      v++;
    }
  }
  return "";
}

// Serial.println(tachChuoi(sv, '|', 0));

void writeEEPROM(int startAdr, String writeString)
{
  EEPROM.begin(512);
  Serial.println();
  Serial.println("Startup");
  int charLength = writeString.length();
  Serial.println("writing eeprom:");
  for (int i = 0; i < charLength; ++i)
  {
    EEPROM.write(startAdr + i, writeString[i]);
    Serial.print("Wrote: ");
    Serial.println(writeString[i]);
  }
  EEPROM.write(writeString.length(), '\0');
  EEPROM.commit();
}

String readEEPROM(int startAdr, int maxLength)
{
  String dest = "";
  Serial.println("Reading EEPROM");
  EEPROM.begin(512);
  for (int i = 0; i < maxLength; ++i)
  {
    dest += char(EEPROM.read(startAdr + i));
    if (dest[i] == '\0')
      break;
  }
  Serial.print("ready reading:");
  Serial.println(dest);
  return dest;
}

// writeEEPROM(0,wifi_ssid_private);//32 byte max length
// writeEEPROM(32,wifi_password_private);//32 byte max length
// writeEEPROM(64,clientName);//10 byte max length
// writeEEPROM(74,ipAddr);//17 byte max length
// EEPROM.commit();

// readEEPROM(0,32,wifi_ssid_private);//get SSID max 32byte
// readEEPROM(32,32,wifi_password_private);get PW max 32byte
// readEEPROM(64,10,clientName);//get clientName max 10byte
// readEEPROM(74,16,ipAddr);//get ipAddr max 16byte