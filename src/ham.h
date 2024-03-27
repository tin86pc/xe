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

