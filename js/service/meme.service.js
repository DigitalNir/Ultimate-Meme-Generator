'use strict'

let gMeme = null
let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

// Define the line data for each meme
const line1 = {
  txt: 'First meme text',
  size: 60,
  fillColor: 'red',
  strokeColor: 'yellow',
}
const line2 = {
  txt: 'Second meme text',
  size: 40,
  fillColor: 'blue',
  strokeColor: 'purple',
}
const line3 = {
  txt: 'Third meme text',
  size: 40,
  fillColor: 'green',
  strokeColor: 'pink',
}

// Create each meme using the _createMeme function
const meme1 = _createMeme(1, 0, [line1])
// const meme2 = _createMeme(2, 0, line2)
// const meme3 = _createMeme(3, 0, line3)

// Combine into an array
gMeme = meme1

// console.log(memes)

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

txt, (font = 'Impact-Regular'), size, fillColor, strokeColor

function addNewLine(lineIdx) {
  const line = _createLine()
  console.log('new added line:', line)
  // setLineTxt(line.txt, lineIdx)
  gMeme.lines.push(line)
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
  if (mode === 1) gMeme.lines[0].fillColor = color
  else if (mode === 2) gMeme.lines[0].strokeColor = color
}

function setFontSize(mode) {
  gMeme.lines[0].size += mode
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

function _createLine(
  txt,
  font = 'Impact-Regular',
  size,
  fillColor,
  strokeColor
) {
  console.log('gMeme:', gMeme)
  const line = {
    txt,
    font,
    size,
    fillColor,
    strokeColor,
  }
  // lineIdx
  console.log('new line:', line)
  return line
}
