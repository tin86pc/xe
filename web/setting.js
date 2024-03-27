"use strict";
import { tinh } from "./1dc.js";
import { send, skSocket } from "./5sk.js";

tinh();

fetch('/setting.json')
   .then(response => response.text())
   .then(text => {
    console.log(text);
    const ar = text.split('|')

    set(a[0], ar[0]);
    set(a[1], ar[1]);
    set(a[2], ar[2]);
    set(a[3], ar[3]);

    document.getElementById('ipb').text+=ar[4];
  
  })
   


const a = ['tf', 'pf', 'tb', 'pb', 'ipf', 'ipb']

function get(id) {
  return document.getElementById(id).value;
}

function set(id, v) {
  document.getElementById(id).value = v;
}

document.getElementById('ok').addEventListener("click", (e) => {

  const nd=get("tf")+"|"+get("pf")+"|"+get("tb")+"|"+get("pb")+"|";
  console.log(nd);

  const blob = new Blob([nd], { type: 'application/json' });
  let formData = new FormData();
  formData.append("file", blob,'setting.json');

  fetch('/u', {
    method: 'POST',
    body: formData})
   .then(response => {
    if(response.status==200){
      alert("lưu thành công")
    }
  })
  
})

// function capNhatHienThi(s) {
//   if (s.charAt(0) == "s") {
//     s=s.substring(1)
//     const ar = s.split('|')
//     for (let i = 0; i < ar.length; i++) {
//       set(a[i], ar[i]);
//     }
//   }
// }

// skSocket(capNhatHienThi)





