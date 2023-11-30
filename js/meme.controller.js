'use strict'
const DEFAULT_FONT = 'Impact-Regular'
const PADDING = 10

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
  // gCtx.textAlign = 'left' // Align text to the left
  // gCtx.textBaseline = 'middle'

  // Measure the text width
  const textWidth = gCtx.measureText(txt).width

  // Check if text overflows on the right side of the canvas and adjust
  if (x + textWidth > gElCanvas.width) {
    x = gElCanvas.width - textWidth
  }

  // Draw the text
  gCtx.fillText(txt, x + PADDING + 5, y)
  gCtx.strokeText(txt, x + PADDING + 5, y)
}

function drawRect(x, y, width, fontSize) {
  const rectHeight = fontSize
  gCtx.lineWidth = 1
  gCtx.strokeStyle = 'blue'

  // Adjust rectangle position and size to surround the text with padding
  gCtx.strokeRect(
    x + PADDING,
    y - fontSize + PADDING, // Adjust y to top of the text plus padding
    width + PADDING,
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
  const modeStr = mode === 1 ? 'fill' : 'stroke'
  document.getElementById(`color-picker-${modeStr}`).click()
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
  setSelectLineOnSwitch()
  renderMeme()
}

function onChangeAlignment(mode) {
  const selectedLine = getSelectedLine()
  gCtx.font = `${selectedLine.size}px ${selectedLine.font || DEFAULT_FONT}`
  const textWidth = gCtx.measureText(selectedLine.txt).width

  setAlignment(mode, textWidth, gElCanvas.width)
  renderMeme()
}

function onMouseClick(ev) {
  const { offsetX, offsetY } = ev
  const meme = getMeme()

  console.log('offsetX:', offsetX, '\noffsetY:', offsetY)

  const clickedLine = meme.lines.find((line) => {
    gCtx.font = `${line.size}px ${line.font || DEFAULT_FONT}`
    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size

    // Define the text bounding box
    const textBoundingBox = {
      left: line.pos.x,
      right: line.pos.x + textWidth,
      top: line.pos.y - textHeight / 2,
      bottom: line.pos.y + textHeight / 2,
    }

    // Check if click is inside the bounding box
    return (
      offsetX >= textBoundingBox.left &&
      offsetX <= textBoundingBox.right &&
      offsetY >= textBoundingBox.top &&
      offsetY <= textBoundingBox.bottom
    )
  })

  console.log('clickedLine:', clickedLine)

  if (clickedLine) {
    // Perform actions when a line is clicked
    const lineIdx = meme.lines.findIndex((line) => line === clickedLine)
    setSelectedLineIdx(lineIdx)
    renderMeme()
  }
}
