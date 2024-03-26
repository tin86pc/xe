"use strict";
import { tinh } from "./1dc.js";
import { send, skSocket } from "./5sk.js";

tinh();

const a = ['tf', 'pf', 'tb', 'pb', 'ipf', 'ipb']

function get(id) {
  return document.getElementById(id).value;
}

function set(id, v) {
  document.getElementById(id).value = v;
}

document.getElementById('ok').addEventListener("click", (e) => {

  const obj={
    "tf": get("tf"),
    "pf": get("pf"),
    "tb": get("tb"),
    "pb": get("pb")
  }

  const jsn = JSON.stringify(obj);
  const blob = new Blob([jsn], { type: 'application/json' });
  let formData = new FormData();
  formData.append("file", blob,'setting.json');

  fetch('/u', {
    method: 'POST',
    body: formData})
   .then(response => console.log(response.status))
  
  console.log("send file ok");
})

function capNhatHienThi(s) {
  if (s.charAt(0) == "s") {
    s=s.substring(1)
    const ar = s.split('|')
    for (let i = 0; i < ar.length; i++) {
      set(a[i], ar[i]);
    }
  }
}

skSocket(capNhatHienThi)





