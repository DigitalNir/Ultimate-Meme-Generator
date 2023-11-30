'use strict'
const DEFAULT_FONT = 'Impact-Regular'

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
  const image = getImgById(imgId)
  const imgUrl = image.imgUrl
  const elImg = new Image()

  elImg.src = imgUrl

  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    // Draw the text after the image has been loaded and drawn

    meme.lines.forEach((line) => {
      if (!line.pos) {
        console.error('Line position is undefined:', line)
        return // Skip this line
      }

      drawText(
        line.txt,
        line.font,
        line.size,
        line.fillColor,
        line.strokeColor,
        line.pos.x,
        line.pos.y
      )
    })

    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
      const selectedLine = meme.lines[meme.selectedLineIdx]
      gCtx.font = `${selectedLine.size}px ${selectedLine.font}`
      const textWidth = gCtx.measureText(selectedLine.txt).width
      const textHeight = selectedLine.size // Approximate height from font size

      // Draw the rectangle around the selected line
      drawRect(selectedLine.pos.x, selectedLine.pos.y, textWidth, textHeight)
    }
  }
}

function drawText(txt, font, size, fillColor, strokeColor, x, y) {
  gCtx.lineWidth = 2
  gCtx.fillStyle = fillColor
  gCtx.strokeStyle = strokeColor
  gCtx.font = `${size}px ${font}`
  // gCtx.textAlign = 'left' // Align text to the left
  // gCtx.textBaseline = 'middle'

  // Measure the text width
  const textWidth = gCtx.measureText(txt).width

  // Check if text overflows on the right side of the canvas and adjust
  if (x + textWidth > gElCanvas.width) {
    x = gElCanvas.width - textWidth
  }

  // Draw the text
  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}

function drawRect(x, y, width, fontSize) {
  const padding = 10 // Padding of 10px on top bottom
  const rectHeight = fontSize
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'blue'

  // Adjust rectangle position and size to surround the text with padding
  gCtx.strokeRect(
    x,
    y - fontSize + padding, // Adjust y to top of the text plus padding
    width + padding,
    rectHeight
  )
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
  addNewLine()
  renderMeme()
}

function onSwitchLine() {
  setSelectLine()
  renderMeme()
}
