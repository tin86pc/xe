#include <Servo.h>
Servo myservo;

void setServo(int val)
{
    val = map(val, -540, 540, 0, 180);
    Serial.print(val);
    myservo.write(val);
}

void startServo()
{
    myservo.attach(D7);
    setServo(0);
}



// void setup()
// {
// ledcAttachPin(18, 0); // broche 18, kênh 0.
// ledcSetup(0, 5000, 12); // kênh = 0, tần số = 5000 Hz, độ phân giải = 12 bit
// ledcWrite(0, 2048); // kênh = 0, chu kỳ quan hệ = 2048
// }

