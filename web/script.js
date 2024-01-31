console.log("esp 8266");
var rainbowEnable = false;
var ws = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);
ws.onopen = function () {
  console.log('WebSocket Connect');
  ws.send('WebSocket Connect');
};
ws.onerror = function (error) {
  console.log('WebSocket Error ', error);
};
ws.onmessage = function (e) {
  console.log('Server: ', e.data);
};
ws.onclose = function () {
  console.log('WebSocket connection closed');
};

function sendRGB () {
  var r = document.getElementById('r').value** 2 / 1023;
  var g = document.getElementById('g').value** 2 / 1023;
  var b = document.getElementById('b').value** 2 / 1023;

  var rgb = r << 20 | g << 10 | b;
  var rgbstr = '#' + rgb.toString(16);
  console.log('RGB: ' + rgbstr);
  ws.send(rgbstr);
}

function rainbowEffect () {
  rainbowEnable = ! rainbowEnable;
  if (rainbowEnable) {
    ws.send("R");
    document.getElementById('rainbow').style.backgroundColor = '#00878F';
    document.getElementById('r').className = 'disabled';
    document.getElementById('g').className = 'disabled';
    document.getElementById('b').className = 'disabled';
    document.getElementById('r').disabled = true;
    document.getElementById('g').disabled = true;
    document.getElementById('b').disabled = true;
  } else {
    ws.send("N");
    document.getElementById('rainbow').style.backgroundColor = '#999';
    document.getElementById('r').className = 'enabled';
    document.getElementById('g').className = 'enabled';
    document.getElementById('b').className = 'enabled';
    document.getElementById('r').disabled = false;
    document.getElementById('g').disabled = false;
    document.getElementById('b').disabled = false;
    sendRGB();
  }
}