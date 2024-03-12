 
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
  
//send("T");