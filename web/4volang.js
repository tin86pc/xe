import { vt } from "./1dc.js";

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
voLang.addEventListener("mouseup", () => {
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
voLang.addEventListener("touchmove", (e) => {
  moveVolang(e);
})



