function log(nd) {
  const e = document.getElementById("log")
  e.value += "> " + nd + "\r\n";
  e.scrollTop = e.scrollHeight;
}

function tinh() {
  let ngang = window.innerWidth;
  let doc = window.innerHeight;

  const main = document.getElementById("main");

  if (ngang > doc * 2) {
    main.style.width = doc * 2 + "px";
    main.style.height = doc + "px";
  }
  if (doc * 2 >= ngang) {

    main.style.width = ngang + "px";
    main.style.height = ngang / 2 + "px";
  }

  // sử dụng rem làm kích thước tham chiếu 
  document.getElementById('root').style.fontSize = parseFloat(main.style.width) / 100 + "px";
}

window.addEventListener("resize", () => {
  tinh();
});

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
              if (e.touches[i].target.id == e.target.id) {
                  touch = touches[i] ?? changedTouches[i];

                  X = touch.pageX;
                  Y = touch.pageY;
              }
          }
      }

  } else if (e.type.includes(`mouse`)) {
      X = e.clientX;
      Y = e.clientY;
  }

  return {
      x: X,
      y: Y
  }
}




export { log, tinh,vt }