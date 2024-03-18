"use strict";
import { tinh } from "./1dc.js";
import { } from "./2ga.js";
import { khoiToaNutAn } from "./3nutan.js";
import { } from "./4volang.js";
import { } from "./5sk.js";

function khoitao() {
  tinh();
  khoiToaNutAn();
}

khoitao();


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












