var SerialPort = require("serialport").SerialPort;
var serialPort1 = new SerialPort("/dev/cu.usbmodem1421", {
  baudrate: 115200
});

var buff1 = "";
var sensor = [];

serialPort1.on("open", function () {
  console.log('open');
  serialPort1.on('data', function(data) {
    //console.log('data received1: ' + data);
    buff1 += data;

    if(buff1.endsWith('\n'))
    {
      buff1 = buff1.trimRight();

      var strs = buff1.split(':');
      console.log("raw: " + strs);

      for(var num = 0; num < 3; num++)
      {
        var parts = strs[num].split(' ');
        sensor[Number.parseFloat(parts[0])] = parts;
      }

      buff1 = "";
    }
  });

});


var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


var io = require('socket.io')(4000);

io.on('connection', function(socket){
  setInterval(function(){

    for(var num = 0; num < 3; num++)
    {
      var i = Number.parseFloat(sensor[num][0]);
      var x = Number.parseFloat(sensor[num][1]);
      var y = Number.parseFloat(sensor[num][2]);
      var z = Number.parseFloat(sensor[num][3]);

      if(isNaN(x) || isNaN(y) || isNaN(z))
      {
        return;
      }

      socket.emit('mag', { index: i, data: {x: x, y: y, z: z} });
    }
  }, 100);

});
