




console.log("XEEM");



var socket = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);

function log(nd) {
  const l = document.getElementById("log")
  l.value += "> " + nd + "\r\n";
  l.scrollTop = l.scrollHeight;
}

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
  if (localStorage.reset) {
    localStorage.reset = false;
    bat();
  } else {
    tat();
  }
  
}
khoiTao();


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
    w: tam.width / 2,
    h: tam.height / 2
  };
}

function vt(e) {
  let X = 0;
  let Y = 0;

  if (e.type.includes(`touch`)) {
    let { touches, changedTouches } = e.originalEvent ?? e;
    let touch = touches[0] ?? changedTouches[0];
    X = touch.pageX;
    Y = touch.pageY;


    if (touches.length > 1) {

      for (let i = 0; i < touches.length; i++) {
        touch = touches[i] ?? changedTouches[i];
        log(i)
        // log(touch.X);
        // log(touch.Y);

        // const tam = LayTam();
        // if (Math.abs(tam.x - t.pageX) < tam.w && Math.abs(tam.y - t.pageY) < tam.h) {

        //   X = touch.pageX;
        //   Y = touch.pageY;
        // }
      }
    }





    // log("touches " + touches.length);
    // log("changedTouches " + changedTouches.length);

  } else if (e.type.includes(`mouse`)) {
    X = e.clientX;
    Y = e.clientY;
  }

  return {
    x: X,
    y: Y
  }
}


function startVoLang(e) {
  anVoLang = true;
  gocAn = Math.atan2(vt(e).x - LayTam().x, -(vt(e).y - LayTam().y)) * (180 / Math.PI);
}

function upVolang() {
  anVoLang = false;
  angleLuu = angle;
}

function moveVolang(e) {
  if (anVoLang) {
    angle = (Math.atan2(vt(e).x - LayTam().x, -(vt(e).y - LayTam().y))) * (180 / Math.PI) - gocAn + angleLuu;
    console.log(Math.atan2(vt(e).x - LayTam().x, -(vt(e).y - LayTam().y)));
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

function bat() {
  document.getElementById('tat').style.display = 'none';
  document.getElementById('bat').style.display = 'block';
  lock();
  send("B");
}



document.getElementById('btn-bat').addEventListener('click', () => {
  bat();
  localStorage.reset = false;
})

document.getElementById('btn-tat').addEventListener('click', () => {
  tat();
  localStorage.reset = false;
})


document.getElementById('chan-ga').addEventListener('click', () => {
  send("G");
  log("g")
})

document.getElementById('chan-phanh').addEventListener('click', () => {
  log("p")
  send("P");
})


document.getElementById('btn-p').addEventListener('click', (e) => {
  e.preventDefault();
})

document.getElementById('btn-reset').addEventListener('click', (e) => {
  localStorage.reset = true;
  location.reload();
})



// function move() {
//   var elem = document.getElementById("myBar");
//   var height = 1;
//   var id = setInterval(frame, 10);
//   function frame() {
//     if (height >= 100) {
//       clearInterval(id);
//     } else {
//       height++;
//       elem.style.height = height + '%';
//     }
//   }
// }