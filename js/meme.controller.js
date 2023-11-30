'use strict'
const DEFAULT_FONT = 'Impact-Regular'
// const DEFAULT_FONT = 'Arial'

let gElCanvas
let gCtx

function onInitMeme() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderMeme()
}

function renderMeme() {
  const meme = getMeme()
  console.log('meme:', meme)

  renderCanvas()
  drawMeme(meme)
}

function renderCanvas() {
  //Set the background color to grey
  gCtx.fillStyle = '#ede5ff'
  //Clear the canvas,  fill it with grey background
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

// Let's use the image natural width and height
function drawMeme(meme) {
  const imgId = meme.selectedImgId
  //   console.log('imgId from drawMeme:', imgId)
  const image = getImgById(imgId)
  console.log('image:', image)
  const imgUrl = image.imgUrl

  //   const image = getImgById(imgId)

  //   console.log('image:', image)
  //   console.log('image.imgUrl:', image.imgUrl)

  const elImg = new Image()

  elImg.src = imgUrl

  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    // Draw the text after the image has been loaded and drawn

    console.log('meme.lines[0]:', meme.lines[0])
    meme.lines.forEach((line) => {
      const txt = line.txt
      const font = DEFAULT_FONT
      const fillColor = line.fillColor
      const strokeColor = line.strokeColor
      const size = line.size

      const centerX = gElCanvas.width / 2
      const centerY = gElCanvas.height / 2
      drawText(txt, font, size, fillColor, strokeColor, centerX, centerY)
    })
  }
}

function drawText(txt, font, size, fillColor, strokeColor, x, y) {
  gCtx.lineWidth = 2
  gCtx.fillStyle = fillColor
  gCtx.strokeStyle = strokeColor
  gCtx.font = `${size}px ${font}`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
  //   console.log(`Drawing text with font: ${gCtx.font}`)
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

function onLineTxt(ev) {
  setLineTxt(ev.target.value, getSelectedLineIdx())
  console.log('onlinetxt')
  renderMeme()
}

function onChangeColor(ev, mode) {
  // Trigger the click event of the hidden color input
  document.getElementById('color-picker-fill').click()
  setColor(ev.target.value, mode)
  renderMeme()
}

function onChangeFontSize(mode) {
  setFontSize(mode)
  renderMeme()
}

function onAddLine() {
  const lineIdx = getSelectedLineIdx() + 1
  const line = {
    txt: document.querySelector('.meme-text').value,
    font: 'Impact-Regular',
    size: 20,
    fillColor: 'red',
    strokeColor: 'blue',
  }

  addNewLine(lineIdx, line)
  renderMeme()
}
