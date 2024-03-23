"use strict";
import { tinh } from "./1dc.js";
import { send } from "./5sk.js";

function khoitao() {
  tinh();
}

khoitao();

document.getElementById('ok').addEventListener("click", (e) => { 
  console.log("sdfs");
  send('sdfsd');

})






