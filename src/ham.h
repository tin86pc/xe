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

// https://gist.github.com/AshHeskes/6038140
String getContentType(String filename)
{
  if (filename.endsWith(".html"))
    return "text/html";
  else if (filename.endsWith(".css"))
    return "text/css";
  else if (filename.endsWith(".js"))
    return "application/javascript";
  else if (filename.endsWith(".ico"))
    return "image/x-icon";
  else if (filename.endsWith(".gz"))
    return "application/x-gzip";
  else if (filename.endsWith(".svg"))
    return "image/svg+xml";
  else if (filename.endsWith(".txt"))
    return "text/plain";
  return "";
}
