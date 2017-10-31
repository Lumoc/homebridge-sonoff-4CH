# homebridge-sonoff4ch


![Sonoff 4 CH or Sonoff 4 CH PRO](http://sonoff.itead.cc/images/article/Sonoff-4ch-pro/4CH-PRO_EN.jpg)

### Features

* Switch 4 Lights on / off. 

  You can now ask Siri to turn on / off any lights!

##### Instructions

1. Set Sonoff 4 CH or Sonoff 4 CH Pro in programing mode, and flash ESPEasy firmware https://github.com/letscontrolit/ESPEasy/releases
Video instructions link: https://www.youtube.com/watch?v=hOFvbdYkOII

2. Sonoff 4ch/4chpro will creates a new Wi-Fi access point called **ESP_0**.

3. Connect your PC to the network with password `configesp`.

4. Open web browser and go to `http://192.168.4.1`.

5. Go through the setup to connect Sonoff to your Wi-Fi network.

6. **[Optional]** The design of ESPEasy web interface is really hurting my eyes. I have customized a style sheet [here](https://github.com/seikan/homebridge-sonoff-basic-espeasy/blob/master/esp.css). Go to  `Tools` > `Settings` > `Load`, upload the **[esp.css](https://raw.githubusercontent.com/seikan/homebridge-sonoff-basic-espeasy/master/esp.css)** to change the interface.

7. Now, go to HARDWARE section, select GPIO-13 (D7) for Wifi Status Led to enable the green LED light on Sonoff. Submit the changes.

8. 
Go to `DEVICES` section, edit `Task #1`. Insert the values: 
```
Device: Switch input
Name: Light1
1st GPIO: Gpio 4
Switch Type: Switch
Switch Button Type: Normal Switch
```
Go to `DEVICES` section, edit `Task #2`. Insert the values:
```
Device: Switch input
Name: Light2
1st GPIO: Gpio 5
Switch Type: Switch
Switch Button Type: Normal Switch
```
Go to `DEVICES` section, edit `Task #3`. Insert the values:
```
Device: Switch input
Name: Light3
1st GPIO: Gpio 12
Switch Type: Switch
Switch Button Type: Normal Switch
```
Go to `DEVICES` section, edit `Task #4`. Insert the values:
```
Device: Switch input
Name: Light4
1st GPIO: Gpio 15
Switch Type: Switch
Switch Button Type: Normal Switch
```

9. We have enabled the hardware GPIO to work, now we need to configure the rules for HTTP request.

10. Go to `RULES` section, insert the following codes and submit.

    ```
    On 4PowerOn Do
    	gpio,4,1
    EndOn

    On 4PowerOff Do
    	gpio,4,0
    EndOn
    
    On 5PowerOn Do
      gpio,5,1
    EndOn

    On 5PowerOff Do
    	gpio,5,0
    EndOn

    On 12PowerOn Do
    	gpio,12,1
    EndOn

    On 12PowerOff Do
    	gpio,12,0
    EndOn
    
    On 15PowerOn Do
      gpio,15,1
    EndOn

    On 15owerOff Do
      gpio,15,0
    EndOn

    ```

11.Finally, the Sonoff basic switch is fully customized. Connect it to a live socket.



### Installation

1. Install required packages.

   ```
   npm install -g homebridge-sonoff4ch request
   ```

   ​

2. Add following lines to `config.json`.

   ```
     "accessories": [
       {
         "accessory": "sonoff4ch",
         "name": "NAME_OF_LIGHT_1",
         "ip": "IP_ADDRESS_OF_THE_SONOFF_4CH",
         "gpio": "4"
       },
       {
         "accessory": "sonoff4ch",
         "name": "NAME_OF_LIGHT_2",
         "ip": "IP_ADDRESS_OF_THE_SONOFF_4CH",
         "gpio": "5"
       },
       {
         "accessory": "sonoff4ch",
         "name": "NAME_OF_LIGHT_3",
         "ip": "IP_ADDRESS_OF_THE_SONOFF_4CH",
         "gpio": "12"
       },
       {
         "accessory": "sonoff4ch",
         "name": "NAME_OF_LIGHT_4",
         "ip": "IP_ADDRESS_OF_THE_SONOFF_4CH",
         "gpio": "15"
       }
     ]
   ```

3. Restart Homebridge, and your Sonoff basic a will be added to Home app.

  
