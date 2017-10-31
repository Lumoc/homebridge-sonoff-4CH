# homebridge-sonoff4ch

This is Sonoff 4 CH basic plugin for [Homebridge](https://github.com/nfarina/homebridge). You will need some soldering works to gain access to flash [ESPEasy](https://www.letscontrolit.com/) firmware.

![Sonoff 4 CH or Sonoff 4 CH PRO](http://sonoff.itead.cc/images/article/Sonoff-4ch-pro/4CH-PRO_EN.jpg)

### Features

* Switch 4 Lights on / off. 

  You can now ask Siri to turn on / off any lights!

##### Instructions

1. Please see the [Hardware Preparation](https://github.com/arendst/Sonoff-Tasmota/wiki/Hardware-Preparation) page for general instructions.

As always, you need to access the serial interface. The **four serial pins** (3V3, Rx, Tx, GND) can be seen in the first picture.
*Attention:* The printed labels on the PCB for Rx and Tx are incorrectly swapped as can be seen on the image.

<img title="Sonoff 4CH serial connection pins" src="https://github.com/arendst/arendst.github.io/blob/master/media/sonoff4ch_pins.jpg" width="48%" /> 
<img title="Sonoff 4CH GPIO0" src="https://github.com/arendst/arendst.github.io/blob/master/media/sonoff4ch_gpio0.jpg" width="42%" align="right" />

The Sonoff 4CH features four hardware buttons of which one is already connected to GPIO0, which hence can be used to bring the module into [Programming Mode](https://github.com/arendst/Sonoff-Tasmota/wiki/Hardware-Preparation#bringing-the-module-in-flash-mode). The button is shown on the second picture.

### Sonoff 4CH Pro 

The "FW/IO0" button (Switch 1) is not directly connected to GPIO0 of the ESP module. A different method has to be used to program this board.

To program the ESP chip disconnect power from the board, connect a cable from any Ground (GND) pin to the GPIO0 pin on the ESP (be careful not to touch any of the other pins). This is the second pin to the right on the top row of pins (see picture). While holding the pin connected power on the board. The board does not respond to any button pressed when in programming mode and LED 1, 2 and 3 are on (might differ per board). 

Use the ESP programming header as described in the picture to upload the firmware and follow regular programming procedure.

<img title="Sonoff 4CH Pro programming" src="https://github.com/arendst/arendst.github.io/blob/master/media/4chpro_gpio0.JPG" width="100%" align="middle" />


2. Lay it on the table and solder 5 header pins as show in the picture below. **WARNING:  Please make sure the switch is not connected to live socket.** 

   ![](https://user-images.githubusercontent.com/73107/27028725-43769bfc-4f98-11e7-92cf-cb20eb8012b3.png)

3. Plug in the **four** dupoint wires.

   ![](https://user-images.githubusercontent.com/73107/27028903-dc9522d6-4f98-11e7-86b8-a95a9770bb22.png)

4. Connect the wires to TTL to USB adaptor.

   ![](https://user-images.githubusercontent.com/73107/27029021-396092b6-4f99-11e7-8b21-2eb5198b9ce0.png)

   The correct position is as following:

   * Red: 3v3
   * Green: TXD
   * Yellow: RXD
   * Blue: GND

   **Notes: ** Some TTL to USB adaptor may not working in this way. If the device is not connected correctly, swap the position of Green (TXD) and Yellow (RXD) wire.

5. Download [ESPEasy R148](https://github.com/seikan/homebridge-sonoff-basic-espeasy/files/1067777/ESPEasy_R148.zip) firmware from [here](https://github.com/seikan/homebridge-sonoff-basic-espeasy/files/1067777/ESPEasy_R148.zip). This is the version that works perfectly with Sonoff basic. I was facing serious connection issue when I flashed with R120 firmware as recommended in the [official website](https://www.letscontrolit.com/wiki/index.php/ESPEasy#Loading_firmware).

6. Unzip the downloaded package.

7. Press and hold the button on Sonoff basic, plug the TTL to USB adaptor to PC. Release the button once plugged.

8. Press `WIN` + `R` on keyboard and type `devmgmt.msc` to open device manager. Check under Ports (COM & LPT) section to find out the COM port used by the adaptor.

   <img src="https://user-images.githubusercontent.com/73107/27029482-263e1e68-4f9b-11e7-9506-ac8d1cb11758.png" width="400">

   ​

9. Press `WIN ` + `R` on keyboard and type `cmd` to open command line.

10. Go the folder where ESPEasy located.

11. Execute the `flash` to start flashing the firmware into Sonoff.

12. Enter following details when prompted.

    <img src="https://user-images.githubusercontent.com/73107/27029606-98959e8c-4f9b-11e7-9c14-fc82cb608138.png" width="400">

    **Notes: ** Comport is the port you got from **Step 8**.

13. Wait around 3~5 minutes. You should see following output when firmware is successfully flashed.

    <img src="https://user-images.githubusercontent.com/73107/27029737-2a8501d4-4f9c-11e7-85f0-a8efc19e6b6f.png" width="500">

    ​

14. Unplug the USB and plug in again to let Sonoff reboot.

15. Wait about 3~5 minutes and Sonoff will creates a new Wi-Fi access point called **ESP_0**.

16. Connect your PC to the network with password `configesp`.

17. Open web browser and go to `http://192.168.4.1`.

18. Go through the setup to connect Sonoff to your Wi-Fi network.

19. **[Optional]** The design of ESPEasy web interface is really hurting my eyes. I have customized a style sheet [here](https://github.com/seikan/homebridge-sonoff-basic-espeasy/blob/master/esp.css). Go to  `Tools` > `Settings` > `Load`, upload the **[esp.css](https://raw.githubusercontent.com/seikan/homebridge-sonoff-basic-espeasy/master/esp.css)** to change the interface.

20. Now, go to `HARDWARE` section, select **GPIO-13 (D7)** for **Wifi Status Led** to enable the green LED light on Sonoff. Submit the changes.

21. Go to `DEVICES` section, edit `Task #1`. Insert the values as the picture below and submit.

    <img src="https://user-images.githubusercontent.com/73107/27033724-365c053c-4fad-11e7-8259-4869e7651260.png" width="500">

    ​

22. Edit `Task #2`, insert values as picture below and submit.

    <img src="https://user-images.githubusercontent.com/73107/27033811-8d5bc3cc-4fad-11e7-8088-7aeb44a0d221.png" width="500">

    ​

23. We have enabled the hardware GPIO to work, now we need to configure the rules for HTTP request.

24. Go to `RULES` section, insert the following codes and submit.

    ```
    On PowerOn Do
    	gpio,12,1
    EndOn

    On PowerOff Do
    	gpio,12,0
    EndOn

    On Button#State Do
    	If [Button#State] = 0
    		gpio,12,0
    		gpio,13,1
    	Else
    		gpio,12,1
    		gpio,13,0
    	EndIf
    EndOn
    ```

    The codes above contains 3 sections. The `PowerOn` part is to turn on the switch, `PowerOff` part is to turn of the switch. `Button#State` is the part to handle the physical button on Sonoff, so you can toogle the button to turn on/off the switch.

25. Finally, the Sonoff basic switch is fully customized. Connect it to a live socket.

    ​



### Installation

1. Install required packages.

   ```
   npm install -g homebridge-sonoff-basic-espeasy request
   ```

   ​

2. Add following lines to `config.json`.

   ```
     "accessories": [
       {
         "accessory": "SonoffBasicESPEasy",
         "name": "Living Room Switch",
         "ip": "IP_ADDRESS_OF_THE_SONOFF_BASIC"
       }
     ]
   ```

   ​

3. Restart Homebridge, and your Sonoff basic a will be added to Home app.

   ​



### License

See the [LICENSE](https://github.com/seikan/homebridge-sonoff-basic-espeasy/blob/master/LICENSE.md) file for license rights and limitations (MIT).



