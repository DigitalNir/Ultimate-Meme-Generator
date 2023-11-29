'use strict'
let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderMeme()
}

function renderMeme() {
  renderCanvas()
  drawImg()
}

function renderCanvas() {
  //Set the background color to grey
  gCtx.fillStyle = '#ede5ff'
  //Clear the canvas,  fill it with grey background
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, x, y) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'brown'
  gCtx.fillStyle = 'white'
  gCtx.font = '40px Arial'
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

// Let's use the image natural width and height
function drawImg() {
  const elImg = new Image()
  // elImg.src = 'img/square.jpg'
  // elImg.src = 'img/wide.jpg'
  elImg.src = 'img/meme-imgs (square)/1.jpg'
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    // Draw the text after the image has been loaded and drawn
    drawText('hello', 100, 100)
  }
}

// Lets cover a fixed-width canvas using an img
// changing the canvas height
function coverCanvasWithImg(elImg) {
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onClearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  // We may clear part of the canvas
  // gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2)
}

function onSelectImg(elImg) {
  coverCanvasWithImg(elImg)
}
