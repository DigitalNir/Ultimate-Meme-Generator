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
const meme1 = _createMeme(1, 0, line1)
const meme2 = _createMeme(2, 0, line2)
const meme3 = _createMeme(3, 0, line3)

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

function setLineTxt(txt) {
  gMeme.lines[0].txt = txt
}

// Private functions
function _createMeme(
  selectedImgId,
  selectedLineIdx,
  { txt, font = 'Impact-Regular', size, fillColor, strokeColor }
) {
  const meme = {
    selectedImgId,
    selectedLineIdx,
    lines: [
      {
        txt,
        font,
        size,
        fillColor,
        strokeColor,
      },
    ],
  }

  return meme
}

// function _createBooks() {
//   gMeme = loadFromStorage(STORAGE_KEY) || []
//   if (gMeme && gMeme.length) return

//   // If no memes in storage - generate demo data
//   // for (let i = 0; i < 12; i++) {
//   gMeme.push(_createMeme())

//   _saveBooksToStorage()
// }

// function _saveBooksToStorage() {
//   saveToStorage(STORAGE_KEY, gBooks)
// }
