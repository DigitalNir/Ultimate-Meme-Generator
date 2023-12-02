'use strict'

const MEMES_STORAGE_KEY = 'memfyDB_memes'

let gMeme = null
let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  return gMeme
}

function getSelectedLineIdx() {
  return gMeme.selectedLineIdx
}

function getSelectedLine() {
  return gMeme.lines[getSelectedLineIdx()]
}
function setSelectedLineIdx(selectedLineIdx) {
  gMeme.selectedLineIdx = selectedLineIdx
}

function setSelectLineOnSwitch() {
  if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
  else gMeme.selectedLineIdx = 0
}

function setCurrentMeme(meme) {
  gMeme = meme
}
function moveLine(mode, canvasHeight) {
  const line = getSelectedLine()
  const lineHeight = line.size // Assuming the height of the line is determined by its font size
  const movementStep = 20 // The amount by which the line moves with each button press

  // For moving up, check if the line is too close to the top of the canvas
  if (mode === -1 && line.pos.y - movementStep < lineHeight) return

  // For moving down, check if the line is too close to the bottom of the canvas
  if (mode === 1 && line.pos.y + movementStep > canvasHeight - lineHeight)
    return

  // Adjust the position of the line
  line.pos.y += mode * movementStep
}

function addNewLine() {
  let newLine
  const defaultPos = { x: 100, y: 100 }

  if (gMeme.lines.length > 0) {
    const lastLine = gMeme.lines[gMeme.lines.length - 1]
    newLine = _createLine({
      txt: 'New text',
      font: lastLine.font,
      size: lastLine.size,
      fillColor: lastLine.fillColor,
      strokeColor: lastLine.strokeColor,
      pos: { x: lastLine.pos.x, y: lastLine.pos.y + 100 }, // 100 = padding
      alignment: lastLine.alignment,
    })
  } else {
    // Initialize the first line with default settings
    newLine = _createLine({
      txt: 'New text',
      font: DEFAULT_FONT, // Use a constant or a default value
      size: 60,
      fillColor: 'white',
      strokeColor: 'black',
      pos: defaultPos,
      alignment: 'center',
    })
  }

  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
  const selectedLineIdx = getSelectedLineIdx()
  gMeme.lines.splice(selectedLineIdx, 1)
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineTxt(txt, lineIdx) {
  gMeme.lines[lineIdx].txt = txt
  gMeme.selectedLineIdx = lineIdx
}

function setColor(color, mode) {
  if (mode === 1) gMeme.lines[gMeme.selectedLineIdx].fillColor = color
  else if (mode === 2) gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setFontSize(mode) {
  gMeme.lines[gMeme.selectedLineIdx].size += mode * 5
}

function setAlignment(mode, textWidth, canvasWidth) {
  const selectedLine = gMeme.lines[getSelectedLineIdx()]
  if (!selectedLine) return

  console.log('gMeme.lines:', gMeme.lines)

  switch (mode) {
    case 1: // Left
      selectedLine.pos.x = PADDING
      break
    case 2: // Center
      selectedLine.pos.x = canvasWidth / 2 - textWidth / 2
      break
    case 3: // Right
      // For right alignment, position the text such that its end aligns with canvas width minus padding
      selectedLine.pos.x = canvasWidth - textWidth - PADDING
      break
  }
}

function setFont(font) {
  return (getSelectedLine().font = font)
}

// Private functions
function _createMeme(selectedImgId, selectedLineIdx, lines) {
  const meme = {
    selectedImgId,
    selectedLineIdx,
    lines,
  }

  return meme
}

function _createLine({
  txt = 'New text',
  font = 'Impact-Regular',
  size = 20,
  fillColor = 'black',
  strokeColor = 'white',
  pos = { x: 0, y: 0 },
  rect = { x: 0, y: 0, width: 0, height: 0 }, // Initialize rect here
} = {}) {
  return { txt, font, size, fillColor, strokeColor, pos, rect }
}
