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
