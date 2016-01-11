"use strict";

var swapColor = function(canvas, ctx, colorIn, colorNew) {
  // ...change main color (202,162,222)/#CAA2DE to blue?
  var imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height) ;
  var pixels = imgdata.data ;
  console.log(imgdata) ;
  var repls = 0 ;
  var uniq_colors = [] ;
  for(var i=0; i<imgdata.width*imgdata.height; ++i) {
    if(i==(175*imgdata.width + 175)) {
      console.log(pixels[4*i]) ;
      console.log(pixels[4*i+1]) ;
      console.log(pixels[4*i+2]) ;
      console.log(pixels[4*i+3]) ;
    }
    if(colorIn[0]==pixels[4*i] && colorIn[1]==pixels[4*i+1] && colorIn[2]==pixels[4*i+2]) {
      pixels[4*i] = colorNew[0] ;
      pixels[4*i+1] = colorNew[1] ;
      pixels[4*i+2] = colorNew[2] ;
      ++repls ;
    }
  }
  console.log("replacements: " + repls) ;
  ctx.putImageData(imgdata, 0, 0) ;
} ;

var tosecs = 1000 ;
var colors = [
  [205,162,219] // ...source image color
 ,[0xE9,0x1E,0x63]
 ,[0xF4,0x43,0x36]
 ,[0x9c,0x27,0xb0]
 ,[0x67,0x3a,0xb7]
 ,[0x3f,0x51,0xb5]
 ,[0x21,0x96,0xf3]
 ,[0x03,0xa9,0xf4]
 ,[0x00,0xbc,0xd4]
 ,[0x00,0x96,0x88]
 ,[0x4c,0xaf,0x50]
 ,[0x8b,0xc3,0x4a]
 ,[0xcd,0xdc,0x39]
 ,[0xff,0xeb,0x3b]
 ,[0xff,0xc1,0x07]
 ,[0xff,0x98,0x00]
 ,[0xff,0x57,0x22]
 ,[0x79,0x55,0x48]
 ,[0x9e,0x9e,0x9e]
 ,[0x60,0x7d,0x8b]
 ] ;
var cycleColors = function(canvas, ctx, ndx) {
  if(++ndx < colors.length) {
    swapColor(canvas, ctx, colors[ndx-1], colors[ndx]) ;
    window.setTimeout(cycleColors, tosecs, canvas, ctx, ndx) ;
  }
} ;
  

window.onload = function() {
  var srcimg = document.getElementById('logo-src') ;
  var canvas = document.getElementById('logo-mod') ;
  var ctx = canvas.getContext('2d') ;
  ctx.drawImage(srcimg, 0, 0) ;

  window.setTimeout(cycleColors, tosecs, canvas, ctx, 0) ;
} ;
