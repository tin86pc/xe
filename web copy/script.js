"use strict";
function log(nd) {
  const e = document.getElementById("log")
  e.value += "> " + nd + "\r\n";
  e.scrollTop = e.scrollHeight;
}

function tinh() {
  let ngang = window.innerWidth;
  let doc = window.innerHeight;

  const main = document.getElementById("main");

  if (ngang > doc * 2) {
    main.style.width = doc * 2 + "px";
    main.style.height = doc + "px";
  }
  if (doc * 2 >= ngang) {

    main.style.width = ngang + "px";
    main.style.height = ngang / 2 + "px";
  }

  // sử dụng rem làm kích thước tham chiếu
  var r = document.querySelector(':root');
  r.style.setProperty('--ngang', main.style.width);
  console.log(main.style.width);


}
function khoitao() {
  tinh();
}
khoitao();




function tinhFontSize(e) {
  const cao = e.getAttribute("cao");
  e.style.fontSize = (e.clientHeight * cao) / 100 + "px";
}


window.addEventListener("resize", () => {
  tinh();
});

function an_nut(e) {
  log(e);
}

