"use strict";
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

  // sử dụng rem làm kích thước tham chiếu cho
  document.getElementById('root').style.fontSize = parseFloat(main.style.width) / 100 + "px";


}
function khoitao() {
  tinh();
}
khoitao();


window.addEventListener("resize", () => {
  tinh();
});


function an_nut(e) {
  log(e);
}




let khoa = false
function lock() {
  if (khoa == true) {
    khoa = false
    // (B1) UNLOCK FIRST
    screen.orientation.unlock();

    // (B2) THEN EXIT FULL SCREEN
    if (document.fullscreenElement) { document.exitFullscreen(); }
    else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
    else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
    else if (document.msExitFullscreen) { document.msExitFullscreen(); }

  } else {
    khoa = true
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
}



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
    voLang.style.transform = `rotate(${angle}deg)`;
    document.getElementById("td").innerText = angle.toFixed(2);
  }
}

//mouse
voLang.addEventListener("mousedown", (e) => {
  startVoLang(e);
});
voLang.addEventListener("mouseup",  ()=> {
  upVolang();
});
voLang.addEventListener("mousemove", (e) => {
  moveVolang(e);
})

// touch
voLang.addEventListener("touchstart", (e) => {
  startVoLang(e);
});
voLang.addEventListener("touchend",  ()=> {
  upVolang();
});
voLang.addEventListener("touchmove", (e) => {
  moveVolang(e);
})





const chanGa = document.getElementById('chan-ga');
let anChanGa = false




function tinhChanGa(e) {
  let vt = chanGa.getBoundingClientRect()
  let pt = parseInt((e.offsetY / vt.height) * 100)
  document.getElementById("chan-ga2").style.height = pt + '%';
  log(pt);

}

function startChanGa(e) {
  anChanGa = true;
  tinhChanGa(e);

}

function moveChanGa(e) {
  if (anChanGa) {
    tinhChanGa(e);
  }
}

function upChanGa() {
  anChanGa = false;
}


// mouse
chanGa.addEventListener("mousedown", (e) => {
  startChanGa(e);
});
chanGa.addEventListener("mousemove", (e) => {
  moveChanGa(e);
});
chanGa.addEventListener("mouseup", (e) => {
  upChanGa()
});

// touch
chanGa.addEventListener("touchstart", (e) => {
  startChanGa(e);
});
chanGa.addEventListener("touchmove", (e) => {
  moveChanGa(e);
});
chanGa.addEventListener("touchend", (e) => {
  upChanGa()
});




document.getElementById("chan-phanh").addEventListener("click", function () {
  document.getElementById("chan-ga2").style.height = "0" + '%';
})