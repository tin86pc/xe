import { log, vt } from "./1dc.js";

const chanGa = document.getElementById('chan-ga');


function layVTbam(e) {
  let cg = chanGa.getBoundingClientRect()

  let vtb = 100 - parseInt(((vt(e).y - cg.top) / cg.height) * 100)

  if (vtb >= 100) {
    vtb = 100
  }
  if (vtb < 0) {
    vtb = 0;
  }
  return vtb
}

function setChanGa(p) {
  document.getElementById("chan-ga2").style.height = p + '%';
}


let anChanGa = false

let di = 0;
function thayDoiChanGa() {
  if (di < dat) {
    di = di + 1
  }
  if (di > dat) {
    di = di - 1
  }

  setChanGa(di);
}





setInterval(thayDoiChanGa, 50);
let dat = 0

function startChanGa(e) {
  anChanGa = true;
  dat = layVTbam(e)
}

function moveChanGa(e) {
  if (anChanGa) {
    dat = layVTbam(e)
  }
}

function upChanGa() {
  anChanGa = false;
  dat = 0;
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
chanGa.addEventListener("mouseleave", (e) => {
  upChanGa()
});

// touch
chanGa.addEventListener("touchstart", (e) => {
  startChanGa(e);
});
chanGa.addEventListener("touchmove", (e) => {
  moveChanGa(e);
});
chanGa.addEventListener("touchcancel", (e) => {
  upChanGa()
});
chanGa.addEventListener("touchend", (e) => {
  upChanGa()
});



function phanh() {
  dat = 0;
  di = 0;
  setChanGa(0);
}


const chanPhanh = document.getElementById("chan-phanh")
chanPhanh.addEventListener("touchstart", function () {
  phanh();
})

chanPhanh.addEventListener("mousedown", function () {
  phanh();
})


// https://github.com/danro/jquery-easing/blob/master/jquery.easing.js

// function easeInOutSine(x) {
//   return -(Math.cos(Math.PI * x) - 1) / 2;
// }

// t: Thời gian lúc bắt đầu
// b: Giá trị bắt đầu,
// c: Thay đổi về giá trị,
// d: Khoảng thời gian
// function easeInOutSine(t, b, c, d) {
//   return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
// } 

// console.log(easeInOutSine(1, 2, 3, 4));