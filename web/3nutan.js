import { log } from "./1dc.js";
function khoiToaNutAn() {
  const aid = ['nut-P', 'nut-R', 'nut-N', 'nut-D', 'nut-coi', 'nut-den-xa', 'nut-den-gan', 'nut-nguy-hiem', 'nut-trai', 'nut-phai'];

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
}



export { khoiToaNutAn }