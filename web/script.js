console.log("esp 8266");




var socket = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);


var socket;
try {
  socket = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);
} catch (error) {
  console.log("fghfg");
}

socket.addEventListener("message", (event) => {
  console.log("Message from esp ", event.data);
});

socket.addEventListener("open", (event) => {
  console.log('WebSocket Connect');
});

socket.addEventListener("error", (event) => {
  console.log("WebSocket error: ", event);
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket close");
});


const handleSend = (nd) => {
  console.log('Dang gui: ' + nd);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(nd)
  } else {
    setTimeout(() => {
      handleSend(nd)
    }, 1000)
  }
};


const send = (nd) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(nd)
  } else {
    console.log('chua ket noi');
  }
}


function bat() {
  document.getElementById('tat').style.display = 'none';
  document.getElementById('bat').style.display = 'block';
  lock();
  send("B");

}

function tat() {
  document.getElementById('bat').style.display = 'none';
  document.getElementById('tat').style.display = 'block';
  unlock();
  send("T");

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
  if (document.fullscreenElement) { document.exitFullscreen(); }
  else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
  else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
  else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}

function khoiTao() {
  tat();
}
khoiTao();

function ga() {
  Toast("G")
  send("G");
}

function phanh() {
  Toast("P")
  send("P");
}




const Toast = (nd) => {
  const x = document.getElementById("snackbar");
  x.textContent = nd;
  x.className = "show";

  setTimeout(() => {
    x.className = x.className.replace("show", "");
  }, 3000);
}


const delay = time => new Promise(res => {
  setTimeout(res, time)
});


let anVoLang = false;
let gocAn;
let angle;
let angleLuu = 0;
let voLang = document.getElementById("vo-lang");

function LayTam() {
  let tam = voLang.getBoundingClientRect();
  return {
    x: tam.left + tam.width / 2,
    y: tam.top + tam.height / 2,
  };
}

function LayToaDo(e) {
  // <div onmousemove="myFunction(event)" onmouseout="clearCoor()"></div>
  let X = 0;
  let Y = 0;
  if (e.type.includes(`touch`)) {
    Toast("1")
    const { touches, changedTouches } = e.originalEvent ?? e;
    const touch = touches[0] ?? changedTouches[0];
    X = touch.pageX;
    Y = touch.pageY;
  } else if (e.type.includes(`mouse`)) {
    X = e.clientX;
    Y = e.clientY;
  }
  return {
    x: X,
    y: Y
  }
}


function LayToaDo2(e) {
  if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
    Toast("22");
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    x = touch.pageX;
    y = touch.pageY;
  } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
    x = e.clientX;
    y = e.clientY;
  }
}

function myFunction(event) {
  var x = event.touches[0].clientX;
  var y = event.touches[0].clientY;
  document.getElementById("demo").innerHTML = x + ", " + y;
}



function startVoLang(e) {
  anVoLang = true;
  let vt = LayToaDo(e)
  gocAn = Math.atan2(vt.x - LayTam().x, -(vt.y - LayTam().y)) * (180 / Math.PI);
}

function upVolang() {
  anVoLang = false;
  angleLuu = angle;
}

function moveVolang(e) {
  if (anVoLang) {
    let vt = LayToaDo(e)
    angle = (Math.atan2(vt.x - LayTam().x, -(vt.y - LayTam().y))) * (180 / Math.PI) - gocAn + angleLuu;
    console.log(Math.atan2(vt.x - LayTam().x, -(vt.y - LayTam().y)));
    voLang.style.transform = `rotate(${angle}deg)`;
    document.getElementById("td").innerText = angle.toFixed(2);
  }
}

// "touchstart" "mousedown"
voLang.addEventListener("touchstart", (e) => {
  startVoLang(e);
});
voLang.addEventListener("mousedown", (e) => {
  startVoLang(e);
});


//"touchend" "mouseup"
voLang.addEventListener("touchend", function () {
  upVolang();
});
voLang.addEventListener("mouseup", function () {
  upVolang();
});


//"touchmove" "mousemove"
voLang.addEventListener("touchmove", (e) => {
  moveVolang(e);
})
voLang.addEventListener("mousemove", (e) => {
  moveVolang(e);
})