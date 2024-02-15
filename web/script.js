console.log("esp 8266");
var rainbowEnable = false;

var ws = new WebSocket("ws://" + location.hostname + ":81/", ["arduino"]);
ws.onopen = function () {
  console.log("WebSocket Connect");
  ws.send("WebSocket Connect");
  tat();
};

ws.onerror = function (error) {
  console.log("WebSocket Error ", error);
};

ws.onmessage = function (e) {
  console.log("Server: ", e.data);
};

ws.onclose = function () {
  console.log("WebSocket connection closed");
};

function sendRGB() {
  var r = document.getElementById("r").value ** 2 / 1023;
  var g = document.getElementById("g").value ** 2 / 1023;
  var b = document.getElementById("b").value ** 2 / 1023;

  var rgb = (r << 20) | (g << 10) | b;
  var rgbstr = "#" + rgb.toString(16);
  console.log("RGB: " + rgbstr);
  ws.send(rgbstr);
}

const bat = () => {
  lock("landscape");

  ws.send("B");

  document.getElementById("r").className = "enabled";
  document.getElementById("g").className = "enabled";
  document.getElementById("b").className = "enabled";
  document.getElementById("r").disabled = false;
  document.getElementById("g").disabled = false;
  document.getElementById("b").disabled = false;
  sendRGB();
};

const tat = () => {
  unlock();
  ws.send("T");

  document.getElementById("r").className = "disabled";
  document.getElementById("g").className = "disabled";
  document.getElementById("b").className = "disabled";
  document.getElementById("r").disabled = true;
  document.getElementById("g").disabled = true;
  document.getElementById("b").disabled = true;
};

var myScreenOrientation = window.screen.orientation;

// (A) LOCK SCREEN ORIENTATION
function lock(orientation) {
  // (A1) GO INTO FULL SCREEN FIRST
  let de = document.documentElement;
  if (de.requestFullscreen) {
    de.requestFullscreen();
  } else if (de.mozRequestFullScreen) {
    de.mozRequestFullScreen();
  } else if (de.webkitRequestFullscreen) {
    de.webkitRequestFullscreen();
  } else if (de.msRequestFullscreen) {
    de.msRequestFullscreen();
  }

  // (A2) THEN LOCK ORIENTATION
  screen.orientation.lock(orientation);
}

// (B) UNLOCK SCREEN ORIENTATION
function unlock() {
  // (B1) UNLOCK FIRST
  screen.orientation.unlock();

  // (B2) THEN EXIT FULL SCREEN
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function capNhatHuong() {
  const Hrange = document.getElementById("Hrange");
  const Hlabel = document.getElementById("Hlabel");
  Hlabel.innerText = Hrange.value;
}

function capNhatTocDo() {
  const Vrange = document.getElementById("Vrange");
  const Vlabel = document.getElementById("Vlabel");
  Vlabel.innerText = Vrange.value;
}

let anVoLang = false;
let gocAn;
let voLang = document.querySelector(".vo-lang");

let tam = voLang.getBoundingClientRect();
let tamVoLang = {
  x: tam.left + tam.width / 2,
  y: tam.top + tam.height / 2,
};

//touchstart
voLang.addEventListener("mousedown", (e) => {
  anVoLang = true;
  gocAn = Math.atan2(e.pageX - tamVoLang.x, -(e.pageY - tamVoLang.y)) *
    (180 / Math.PI);
});
//touchstop
voLang.addEventListener("mouseup", function () {
  anVoLang = false;
});

voLang.addEventListener("mousemove", (e) => {

  if (anVoLang) {
    let angle =
      Math.atan2(e.pageX - tamVoLang.x, -(e.pageY - tamVoLang.y)) *
      (180 / Math.PI) - gocAn;
    voLang.style.transform = `rotate(${angle}deg)`;
  }
})



