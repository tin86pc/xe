console.log("esp 8266");

var ws = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);

ws.onerror = function (error) {
  console.log('WebSocket Error ', error);
};

ws.onopen = function () {
  console.log('WebSocket Connect');
  ws.send('WebSocket Connect');
};

ws.onmessage = function (e) {
  console.log('onmessage: ', e.data);
};

ws.onclose = function () {
  console.log('WebSocket connection closed');
};


function bat() {
  document.getElementById('bat').style.display = 'block';
  document.getElementById('tat').style.display = 'none';
  lock();
  ws.send("B");
  // ws.onopen = () => ws.send("B");
}

function tat() {
  document.getElementById('bat').style.display = 'none';
  document.getElementById('tat').style.display = 'block';
  unlock();
  ws.send("T");
  // ws.onopen = () => ws.send("T");

}

function lock() {
  // (A1) GO INTO FULL SCREEN FIRST
  let de = document.documentElement;
  if (de.requestFullscreen) { de.requestFullscreen(); }
  else if (de.mozRequestFullScreen) { de.mozRequestFullScreen(); }
  else if (de.webkitRequestFullscreen) { de.webkitRequestFullscreen(); }
  else if (de.msRequestFullscreen) { de.msRequestFullscreen(); }

  // (A2) THEN LOCK ORIENTATION
  if (screen.orientation.type != 'landscape-primary') {
    screen.orientation.lock("landscape");
  }

}

function unlock() {
  // (B1) UNLOCK FIRST
  screen.orientation.unlock();

  // (B2) THEN EXIT FULL SCREEN
  // if (document.exitFullscreen) { document.exitFullscreen(); }

  if (document.fullscreenElement) {
    setTimeout(() => document.exitFullscreen(), 1000);
  }
  else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
  else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
  else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}

function khoiTao() {
  tat();
}
khoiTao();

function ga() {
  console.log("ga");
  ws.send("G");
}

function phanh() {
  console.log("phanh");
  ws.send("P");
}

