This project will take in serial data from an arduino which is connected to an HMC5883L. The data is then relayed to a webpage (served by a simple express server) using socket.io message events. The webpage is a port of one of the samples from the threejs examples website. It contains a simple scene with the 3-component axis of each magnetometer displayed on a plane.

Before using:
1. import/move the Adafruit folder into your arduino ide by selecting the menu 'sketch/include library/add zip library' and import these folders
2. push the magsensor/magsensor.ino file to the arduinos

To use:
1. make sure nodejs is installed on your system. (tested with 5.5 but most recent versions should work fine)
2. run 'npm install'. This will pull down all the nodejs dependencies that are needed to serve the webpage and support socket communication between the serial process and the webpage.
3. note the first lines in test.js. You will need to modify the serial port strings to the addresses from your system. The easiest way to determine this for osx/linux is to just open up the arduino ide and note what the tools/port menu registers when the arduino is plugged in.
4. run 'node test.js' when all arduino are plugged in. If the serial ports don't come up correctly, a message like 'cannot open .....' will be displayed.
5. open a browser and go to 'http://localhost:3000/test.html' to view the sensor data
6. you can unplug and plug back in the usb and keep the server/webpage open and it will automatically reconnect if the serial port designations don't change
