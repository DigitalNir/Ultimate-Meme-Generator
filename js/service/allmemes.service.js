const gAllMemes = []

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
  const meme = { memeId: makeId(), ...gMeme }
  gAllMemes.push(meme)
}

function deleteMeme(memeId) {
  const memeIdx = gAllMemes.findIndex((meme) => meme.memeId === memeId)
  gAllMemes.splice(memeIdx, 1)
  _saveMemesToStorage()
}

function getMemeById(memeId) {
  return gAllMemes.find((meme) => meme.memeId === memeId)
}

function getImgDataURL(meme) {
  return meme.dataUrl
}

function setMemeDataURL(dataUrl) {
  gMeme.dataUrl = dataUrl
}

function _saveMemesToStorage() {
  saveToStorage(MEMES_STORAGE_KEY, gAllMemes)
}
