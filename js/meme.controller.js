'use strict'
const DEFAULT_FONT = 'Impact-Regular'
const PADDING = 10
let shouldDrawRect = true

let gElCanvas
let gCtx

function onInitMeme() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderMeme()
}

function renderMeme(callback) {
  const meme = getMeme()
  console.log('meme:', meme)

  renderCanvas()
  drawMeme(meme, callback)
}

function renderCanvas() {
  //Set the background color to grey
  gCtx.fillStyle = '#ede5ff'
  //Clear the canvas,  fill it with grey background
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

// Let's use the image natural width and height
function drawMeme(meme, callback) {
  const imgId = meme.selectedImgId
  const image = getImgById(imgId)
  const imgUrl = image.imgUrl
  const elImg = new Image()

  elImg.src = imgUrl

  // Function to draw text on the canvas
  function drawTextOnCanvas() {
    meme.lines.forEach((line) => {
      if (!line.pos) {
        console.error('Line position is undefined:', line)
        return // Skip this line
      }
      gCtx.font = line.font
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

      // Draw the rectangle only if shouldDrawRect is true
      if (shouldDrawRect) {
        drawRect(selectedLine.pos.x, selectedLine.pos.y, textWidth, textHeight)
      }
    }

    // Call the callback function after rendering is done
    if (callback) callback()
  }

  // Handle the image load event
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    drawTextOnCanvas()
  }

  // Handle the case where the image is already loaded
  if (elImg.complete && elImg.naturalHeight !== 0) {
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    drawTextOnCanvas()
  }
}

function drawText(txt, font, size, fillColor, strokeColor, x, y) {
  gCtx.lineWidth = 2
  gCtx.fillStyle = fillColor
  gCtx.strokeStyle = strokeColor
  gCtx.font = `${size}px ${font}`
  console.log('gCtx.font from drawText:', gCtx.font)

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

function updateTextRect(lineIndex) {
  const line = gMeme.lines[lineIndex]

  if (!line) return

  gCtx.font = `${line.size}px ${line.font}`
  const textWidth = gCtx.measureText(line.txt).width
  line.rect.width = textWidth
  line.rect.height = line.size * 1.2

  switch (line.alignment) {
    case 'left':
      line.rect.x = line.pos.x
      break
    case 'center':
      line.rect.x = line.pos.x - textWidth / 2
      break
    case 'right':
      line.rect.x = line.pos.x - textWidth
      break
  }

  // y position adjustment
  line.rect.y = line.pos.y - line.rect.height / 2
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
  // Update the text rectangle dimensions and position
  updateTextRect(getSelectedLineIdx())
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

function onMoveLine(mode) {
  moveLine(mode, gElCanvas.height)
  renderMeme()
}

function onChangeAlignment(mode) {
  const selectedLine = getSelectedLine()
  gCtx.font = `${selectedLine.size}px ${selectedLine.font || DEFAULT_FONT}`
  const textWidth = gCtx.measureText(selectedLine.txt).width

  setAlignment(mode, textWidth, gElCanvas.width)
  renderMeme()
}

function onChangeFont(ev) {
  const newFont = ev.target.value
  setFont(newFont)
  const selectedLine = getSelectedLine()
  if (selectedLine) {
    selectedLine.font = newFont

    gCtx.font = `${selectedLine.size}px ${selectedLine.font}`
    console.log('applying selected font', gCtx.font)
    renderMeme() // Re-render to apply the new font
  }
}

function onDeleteLine() {
  deleteLine()
  renderMeme()
}

function onMouseClick(ev) {
  const { offsetX, offsetY } = ev
  const meme = getMeme()

  console.log('offsetX:', offsetX, '\noffsetY:', offsetY)

  const clickedLine = meme.lines.find((line) => {
    gCtx.font = `${line.size}px ${line.font || DEFAULT_FONT}`
    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size * 1.2 // Adjust height calculation

    let startX = line.pos.x
    if (line.alignment === 'center') {
      startX -= textWidth / 2
    } else if (line.alignment === 'right') {
      startX -= textWidth
    }

    const textBoundingBox = {
      left: startX,
      right: startX + textWidth,
      top: line.pos.y - textHeight / 2,
      bottom: line.pos.y + textHeight / 2,
    }

    return (
      offsetX >= textBoundingBox.left &&
      offsetX <= textBoundingBox.right &&
      offsetY >= textBoundingBox.top &&
      offsetY <= textBoundingBox.bottom
    )
  })

  if (clickedLine) {
    const lineIdx = meme.lines.findIndex((line) => line === clickedLine)
    setSelectedLineIdx(lineIdx)
    renderMeme()
  }
}

// Download functions
function prepareCanvasForDownload(callback) {
  // Set the flag to false to hide the rectangle
  shouldDrawRect = false

  // Re-render the meme without the rectangle
  renderMeme(callback) // Pass the callback
}

function restoreCanvasAfterDownload() {
  // Set the flag back to true
  shouldDrawRect = true

  // Re-render the meme to show the rectangle again
  renderMeme()
}

function downloadMeme(elLink) {
  prepareCanvasForDownload(() => {
    // This callback is called after the meme is rendered
    downloadCanvas(elLink) // Now start the download

    restoreCanvasAfterDownload()
  })
}

function prepareCanvasForSave() {}

// Share on Facerbook
function onUploadImg() {
  // Gets the image from the canvas
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }

  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}

function onShareMeme() {
  // Gets the image from the canvas
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }

  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}
