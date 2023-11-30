'use strict'

let gMeme = null
let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

// Define the line data for each meme
const line1 = {
  txt: 'First meme text',
  size: 60,
  fillColor: 'red',
  strokeColor: 'yellow',
  pos: { x: 0, y: 100 }, // Example position
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

// function getMemeById(memeId) {
//   // return gMeme.find((meme) => meme.id === memeId)
//   return
// }

function getSelectedLineIdx() {
  return gMeme.selectedLineIdx
}

function setSelectLine() {
  if (gMeme.selectedLineIdx < gMeme.lines.length) gMeme.selectedLineIdx++
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
      pos: { x: lastLine.pos.x, y: lastLine.pos.y + bottomPadding }, // Example: position below the last line
    })
  } else {
    newLine = _createLine({
      pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
    }) // Default position for the first line
  }

  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
  console.log('gMeme.selectedImgId:', gMeme.selectedImgId)
}

function setLineTxt(txt, lineIdx) {
  console.log('hello from setlinetxt')
  gMeme.lines[lineIdx].txt = txt
  console.log('gMeme.lines[lineIdx].txt:', gMeme.lines[lineIdx].txt)
  gMeme.selectedLineIdx = lineIdx
}

function setColor(color, mode) {
  if (mode === 1) gMeme.lines[gMeme.selectedLineIdx].fillColor = color
  else if (mode === 2) gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setFontSize(mode) {
  gMeme.lines[gMeme.selectedLineIdx].size += mode
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
  pos = { x: 0, y: 0 }, // Default position
} = {}) {
  return { txt, font, size, fillColor, strokeColor, pos }
}
