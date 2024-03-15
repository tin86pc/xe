import { vt, log } from "./1dc.js";
// 2,5 – 3,5 vòng

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
function layGoc(e) {
  return Math.atan2(vt(e).x - LayTam().x, -(vt(e).y - LayTam().y)) * (180 / Math.PI);
}

function startVoLang(e) {
  anVoLang = true;
  gocAn = layGoc(e)
}

function upVolang() {
  anVoLang = false;
  angleLuu = angle;
}


let angle_cu = 0;
let goc = 0;
function moveVolang(e) {
  if (anVoLang) {
    angle = layGoc(e) - gocAn + angleLuu;
    let h = angle - angle_cu;
    angle_cu = angle
    if (h > 300) {
      h = h - 360;
    }
    if (h < 0 && h < -300) {
      h = 360 + h
    }
    goc = goc + h;

    if (goc >= 540) {
      goc = 540
    }
    if (goc < -540) {
      goc = -540
    }


    console.log(goc);



    voLang.style.transform = `rotate(${goc}deg)`;
    document.getElementById("td").innerText = goc.toFixed(2);
  }
}

//mouse
voLang.addEventListener("mousedown", (e) => {
  startVoLang(e);
});
voLang.addEventListener("mouseup", () => {
  upVolang();
});
voLang.addEventListener("mouseleave", (e) => {
  upVolang();
});
voLang.addEventListener("mousemove", (e) => {
  moveVolang(e);
})



// touch
voLang.addEventListener("touchstart", (e) => {
  startVoLang(e);
});
voLang.addEventListener("touchend", () => {
  upVolang();
});
voLang.addEventListener("touchend", (e) => {
  upVolang();
});
voLang.addEventListener("touchmove", (e) => {
  moveVolang(e);
})



