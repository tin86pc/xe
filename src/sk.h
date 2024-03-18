
// if (payload[0] == '#')
// {
//     uint32_t rgb = (uint32_t)strtol((const char *)&payload[1], NULL, 16);
//     int r = ((rgb >> 20) & 0x3FF);
//     int g = ((rgb >> 10) & 0x3FF);
//     int b = rgb & 0x3FF;

//     analogWrite(LED_RED, r);
//     analogWrite(LED_GREEN, g);
//     analogWrite(LED_BLUE, b);
// }
// else if (payload[0] == 'B')
// {
//     chay = true;
// }
// else if (payload[0] == 'T')
// {
//     chay = false;
// }


void xulylenh(String s)
{
  Serial.print(s);
}