"use strict";
import { tinh } from "./1dc.js";
import { send } from "./5sk.js";

tinh();

const a = ['tf', 'pf', 'tb', 'pb', 'ipf', 'ipb']

function get(id) {
  return document.getElementById(id).value;
}

function set(id, v) {
  document.getElementById(id).value = v;
}

document.getElementById('ok').addEventListener("click", (e) => {

  let s = "s"+get(a[0]) + "|" + get(a[1]) + "|" + get(a[2]) + "|" + get(a[3])
  send(s);
  console.log(s);
})






