import { log } from "./1dc.js";
import {send } from "./5sk.js";


function khoiToaNutAn() {
  const aid = ["nut-P", "nut-R", "nut-N", "nut-D", "nut-coi", "nut-den-xa", "nut-den-gan", "nut-nguy-hiem", "nut-trai", "nut-phai"];

  for (let i = 0; i < aid.length; i++) {
    document.getElementById(aid[i]).addEventListener("mousedown", (e) => {
      e['nd'] = "L" + i;
      anNut(e);
    });
    document.getElementById(aid[i]).addEventListener("touchstart", (e) => {
      e['nd'] = "l" + i;
      anNut(e);
    });
  }
}

function anNut(e) {
  e.preventDefault();
  log(e.nd)
  send(e.nd);
}

let khoa = false
document.getElementById('tmh').addEventListener('click', () => {
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
})





export { khoiToaNutAn }