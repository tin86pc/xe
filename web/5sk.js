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

export { send }