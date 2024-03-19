#include "LittleFS.h"

void startLittleFS()
{
    if (!LittleFS.begin())
    {
        Serial.println("An Error has occurred while mounting SPIFFS");
        return;
    }
}

bool clearFile(String filename)
{

    Serial.println("Clear file:" + filename);
    LittleFS.begin();
    File f = LittleFS.open(String("/") + filename, "w");
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

bool saveFile(String filename, const uint8_t *content, uint16_t len)
{
    Serial.println("Save file:" + filename);
    LittleFS.begin();
    File f = LittleFS.open(String("/") + filename, "a");
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

String getFile(String filename)
{
    Serial.println("Get file:" + filename);
    LittleFS.begin();
    File f = LittleFS.open(String("/") + filename, "r");
    String ret = f.readString();

    f.close();

    return ret;
}

bool fomatAll()
{
    Serial.println("Fomat All");
    LittleFS.begin();
    File f = LittleFS.open(String("/") + filename, "a");
    if (!f)
    {
        f.close();
        return false;
    }
    else
    {
        LittleFS.format();
        return true;
    }
}
