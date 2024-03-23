"use strict";
import { tinh } from "./1dc.js";
import { } from "./2ga.js";
import { } from "./6dk.js";
import { khoiToaNutAn } from "./3nutan.js";
import { } from "./4volang.js";


function khoitao() {
  tinh();
  khoiToaNutAn();
}

khoitao();







// var LUT_x = [], LUT_y = [], t, a, b, c, d;
// for (let i = 0; i < 100; i++) {
//   t = i / 100;
//   a = (1 - t) * (1 - t) * (1 - t);
//   b = (1 - t) * (1 - t) * t;
//   c = (1 - t) * t * t;
//   d = t * t * t;
//   LUT_x.push(a * x1 + 3 * b * x2 + 3 * c * x3 + d * x4);
//   LUT_y.push(a * y1 + 3 * b * y2 + 3 * c * y3 + d * y4);
// }




// var p1 = {0.5, 0.5};
// var p2 = {0.5, 0.5};

// cubic-bezier(t, p1, p2){

//        var cX = 3 * (p1.x),
//            bX = 3 * (p2.x - p1.x) - cX,
//            aX = 1 - cX - bX;

//        var cY = 3 * (p1.y - 1),
//            bY = 3 * (p2.y - p1.y) - cY,
//            aY = -1 - cY - bY;

//        var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t);
//        var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + 1;

//        return {x: x, y: y};

//    }

//  var y = cubic-bezier(progress, p1, p2).y;






// bezier = function(t, p0, p1, p2, p3){
//   var cX = 3 * (p1.x - p0.x),
//       bX = 3 * (p2.x - p1.x) - cX,
//       aX = p3.x - p0.x - cX - bX;
        
//   var cY = 3 * (p1.y - p0.y),
//       bY = 3 * (p2.y - p1.y) - cY,
//       aY = p3.y - p0.y - cY - bY;
        
//   var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
//   var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
        
//   return {x: x, y: y};
// },

// (function(){
//   var accuracy = 0.01, //this'll give the bezier 100 segments
//       p0 = {x: 10, y: 10}, //use whatever points you want obviously
//       p1 = {x: 50, y: 100},
//       p2 = {x: 150, y: 200},
//       p3 = {x: 200, y: 75},
//       ctx = document.createElement('canvas').getContext('2d');

//   ctx.width = 500;
//   ctx.height = 500;
//   document.body.appendChild(ctx.canvas);
  
//   ctx.moveTo(p0.x, p0.y);
//   for (var i=0; i<1; i+=accuracy){
//      var p = bezier(i, p0, p1, p2, p3);
//      ctx.lineTo(p.x, p.y);
//   }

//   ctx.stroke()
// })()

