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

bool get_token(String &from, String &to, uint8_t index, char separator)
{
  uint16_t start = 0, idx = 0;
  uint8_t cur = 0;
  while (idx < from.length())
  {
    if (from.charAt(idx) == separator)
    {
      if (cur == index)
      {
        to = from.substring(start, idx);
        return true;
      }
      cur++;
      while ((idx < from.length() - 1) && (from.charAt(idx + 1) == separator))
        idx++;
      start = idx + 1;
    }
    idx++;
  }
  if ((cur == index) && (start < from.length()))
  {
    to = from.substring(start, from.length());
    return true;
  }
  return false;
}

// uint8_t token_idx = 0;
// while (get_token(tokens, token, token_idx, ' '))
// {
//   Serial.print("Token[");
//   Serial.print(token_idx);
//   Serial.print("] = \"");
//   Serial.print(token);
//   Serial.println("\"");
//   token_idx++;
// }
