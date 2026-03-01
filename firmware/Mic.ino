//Speaker side code
#include<WiFi.h>
#include<ArduinoWebsockets.h>
#include "driver/i2s.h"
#include "I2s_Setting.h"
#include "Const.h"
using namespace websockets;
WebsocketsClient client;
TaskHandle_t i2sReadTaskHandler = NULL;

void setup() {
  // put your setup code here, to run once:
  
  Serial.begin(115200);
  i2s_buff_init();
  start_to_connect();
  i2s_TX_init();
  Serial.println("Listening Mode");
}

void loop() {
  // put your main code here, to run repeatedly:
    if (client.available()) {
    client.poll();
  }
}


void start_to_connect(){
  WiFi.begin(ssid, password);
  Serial.println("- WiFi Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("+ WiFi Connected");
  Serial.println("- Socket Connecting");
  
  client.onMessage(onMessageCallback);
  client.onEvent(onEventsCallback);
  while(!client.connect(websockets_server_host, websockets_server_port, "/")){
    delay(1000);
    Serial.print(".");
  }

  Serial.println("+ Socket Connected");
}

void onMessageCallback(WebsocketsMessage message) {
    int msgLength = message.length();
    if(message.type() == MessageType::Binary){
      if(msgLength > 0){
        i2s_write_data((char*)message.c_str(), msgLength);
      }
    }
}

void onEventsCallback(WebsocketsEvent event, String data) {
    if(event == WebsocketsEvent::ConnectionClosed) {
        ESP.restart();
    }
}