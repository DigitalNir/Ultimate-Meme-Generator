const gAllMemes = []
let gMemeId = 0

// Define the line data for each meme
const defaultLine = {
  txt: 'Add Text Here',
  font: 'Impact-Regular',
  size: 60,
  fillColor: 'white',
  strokeColor: 'black',
  pos: { x: 0, y: 100 },
  rect: { x: 50, y: 80, width: 0, height: 0 }, // Updated dynamically
}

const meme1 = _createMeme(1, 0, [defaultLine])
gMeme = meme1

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

// const meme2 = _createMeme(2, 0, line2)
// const meme3 = _createMeme(3, 0, line3)

createMemes()

function createMemes() {
  const gAllMemes = loadFromStorage(IMGS_STORAGE_KEY) || []
  if (gAllMemes && gAllMemes.length) return

  // If no images in storage - generate demo data
  gAllMemes.push(meme1)

  //   _saveMemesToStorage()
}

function getAllMemes() {
  return gAllMemes
}

function saveMeme() {
  addMeme()
  _saveMemesToStorage()
}

function addMeme() {
  gMemeId++
  const meme = { memeId: gMemeId, ...gMeme }
  gAllMemes.push(meme)
}

function getImgDataURL(meme) {
  return meme.dataUrl
  //   return getImgById(meme.selectedImgId)
}

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => book.id === bookId)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function setMemeDataURL(dataUrl) {
  gMeme.dataUrl = dataUrl
}

function _saveMemesToStorage() {
  saveToStorage(MEMES_STORAGE_KEY, gAllMemes)
}
