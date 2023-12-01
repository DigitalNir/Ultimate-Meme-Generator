'use strict'
let gMeme = null
let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

// Define the line data for each meme
const line1 = {
  txt: 'Add Text Here',
  font: 'Impact-Regular',
  size: 60,
  fillColor: 'white',
  strokeColor: 'black',
  pos: { x: 0, y: 100 },
  rect: { x: 50, y: 80, width: 0, height: 0 }, // Updated dynamically
}

// Repeat for line2 and line3...

// const line2 = {
//   txt: 'Second meme text',
//   size: 40,
//   fillColor: 'blue',
//   strokeColor: 'purple',
// }
// const line3 = {
//   txt: 'Third meme text',
//   size: 40,
//   fillColor: 'green',
//   strokeColor: 'pink',
// }

// Create each meme using the _createMeme function
const meme1 = _createMeme(1, 0, [line1])
// const meme2 = _createMeme(2, 0, line2)
// const meme3 = _createMeme(3, 0, line3)

gMeme = meme1

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

function addNewLine() {
  let newLine
  const bottomPadding = 100
  if (gMeme.lines.length > 0) {
    const lastLine = gMeme.lines[gMeme.lines.length - 1]
    newLine = _createLine({
      txt: 'New text',
      font: lastLine.font,
      size: lastLine.size,
      fillColor: lastLine.fillColor,
      strokeColor: lastLine.strokeColor,
      pos: { x: lastLine.pos.x, y: lastLine.pos.y + bottomPadding },
      alignment: 'left',
    })
  }

  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
  console.log('gMeme.selectedImgId:', gMeme.selectedImgId)
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
