#include <FS.h>
bool clearData(String filename)
{

    Serial.println("clearData:" + filename);
    SPIFFS.begin();
    File f = SPIFFS.open(String("/") + filename, "w");
    if (!f)
    {
        f.close();
        return false;
    }
    else
    {
        f.close();
        return true;
    }
}

bool saveData(String filename, const uint8_t *content, uint16_t len)
{
    Serial.println("saveData:" + filename);
    SPIFFS.begin();
    File f = SPIFFS.open(String("/") + filename, "a");
    if (!f)
    {
        f.close();
        return false;
    }
    else
    {
        f.write(content, len);
        f.close();
        return true;
    }
}

String getData(String filename)
{
    Serial.println("getData:" + filename);
    SPIFFS.begin();
    File f = SPIFFS.open(String("/") + filename, "r");
    String ret = f.readString();

    f.close();

    return ret;
}
