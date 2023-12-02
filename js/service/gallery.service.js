'use strict'

const IMGS_STORAGE_KEY = 'memfyDB_imgs'
const IMG_PATH = 'img/meme-imgs (square)'

let gImgId = 0
let gImgs = null

createImgs()

function getImages() {
  return gImgs
}

function getImgById(imgId) {
  return gImgs.find((img) => img.imgId === imgId)
}

function createImgs() {
  gImgs = loadFromStorage(IMGS_STORAGE_KEY) || []
  if (gImgs && gImgs.length) return

  // If no images in storage - generate demo data
  for (let i = 0; i < 18; i++) {
    gImgs.push(_createImg([makeLorem(), makeLorem()]))
  }
  _saveImgsToStorage()
}

// Private functions

// Create image object
function _createImg(keywords) {
  return { imgId: ++gImgId, imgUrl: `${IMG_PATH}/${gImgId}.jpg`, keywords }
}

function _saveImgsToStorage() {
  saveToStorage(IMGS_STORAGE_KEY, gImgs)
}
