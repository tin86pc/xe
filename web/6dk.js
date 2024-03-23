import { send,skSocket } from "./5sk.js";

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

// const aid = ["nut-P", "nut-R", "nut-N", "nut-D", "nut-coi", "nut-den-xa", "nut-den-gan", "nut-nguy-hiem", "nut-trai", "nut-phai"];

// hamsk = xuLyDuLieuTuESP;
skSocket(xuLyDuLieuTuESP)

function xuLyDuLieuTuESP(s) {
  if (s.charAt(0) == "H") {
    document.getElementById("nut-P").classList.remove("btnactive")
    document.getElementById("nut-R").classList.remove("btnactive")
    document.getElementById("nut-N").classList.remove("btnactive")
    document.getElementById("nut-D").classList.remove("btnactive")
  }

  if (s == "HP") {
    document.getElementById("nut-P").classList.add("btnactive")
  }
  if (s == "HR") {
    document.getElementById("nut-R").classList.add("btnactive")
  }
  if (s == "HN") {
    document.getElementById("nut-N").classList.add("btnactive")
  }
  if (s == "HD") {
    document.getElementById("nut-D").classList.add("btnactive")
  }
}
