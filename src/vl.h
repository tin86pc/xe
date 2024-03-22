#include <Servo.h>
Servo myservo;

void setServo(int val)
{
    val = map(val, -540, 540, 45, 135);
    Serial.println(val);
    myservo.write(val);
}

void startServo()
{
    myservo.attach(D7);
    setServo(0);
}

String huong = "P";
#define tien D4
#define lui D5
#define td D6

void ktTocDo()
{
    pinMode(tien, OUTPUT);
    pinMode(lui, OUTPUT);
    pinMode(td, OUTPUT);
}

void datTocDo(int val)
{
    val = map(val, 0, 100, 0, 255);
    if (huong == "D")
    {
        digitalWrite(lui, LOW);
        digitalWrite(tien, HIGH);
    }
    if (huong == "R")
    {
        digitalWrite(tien, LOW);
        digitalWrite(lui, HIGH);
    }
    if (huong == "N" || huong == "P")
    {
        digitalWrite(tien, LOW);
        digitalWrite(lui, LOW);
    }
    analogWrite(td, val);
}

// - P (Parking)    = đậu xe
// - R (Reverse)    = lùi xe
// - N (Neutral)    = trạng thái tự do
// - D (Drive)      = số tiến