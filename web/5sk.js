import { log } from "./1dc.js"

var socket;
try {
  socket = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);
} catch (error) {
  console.log("lỗi socket");
}

socket.addEventListener("message", (event) => {
  console.log(event.data);
  log(event.data)
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



function handleSend(nd) {
  console.log('Dang gui: ' + nd);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(nd)
  } else {
    setTimeout(() => {
      handleSend(nd)
    }, 1000)
  }
};


function send(nd) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(nd)
  } else {
    console.log('chua ket noi');
  }
}

let vl = document.getElementById("vo-lang");
let lvl = 0;

setInterval(function () {
  let vvl = vl.getAttribute("v");
  if (vvl == null) vvl = 0;

  if (lvl !== vvl) {

    lvl = vvl;
    let s = "v" + lvl;
    console.log(s);
    send(s);
  }

}, 50)

let cg = document.getElementById('chan-ga2');
let lcg = 0;
setInterval(function () {
  let vcg = cg.getAttribute("v");
  if (lcg !== vcg) {
    lcg = vcg
    let s = "g" + lcg;
    console.log(s);
    send(s);
  }

}, 50)

export { send }