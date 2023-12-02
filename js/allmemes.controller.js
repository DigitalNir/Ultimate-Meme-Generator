function onInitAllMemes() {
  renderAllMemes()
}

function renderAllMemes() {
  const allMemes = getAllMemes()
  const elAllMemes = document.querySelector('.section-allmemes')
  allMemes.forEach((meme) => {
    const elImg = new Image()
    const image = getImgByMeme(meme)
    console.log('image:', image)
    elImg.src = image.imgUrl
    elImg.dataset.imgId = image.imgId
    elAllMemes.appendChild(elImg)
  })
}

function onMemeSelect(ev) {
  if (ev.target.tagName !== 'IMG') return
}

function onSaveMeme() {
  saveMeme()
  renderAllMemes()
}

function onShowAllMemes() {
  document.querySelector('.section-editor').classList.add('hidden')
  document.querySelector('.section-allmemes').classList.remove('hidden')
  document.querySelector('.section-gallery').classList.add('hidden')
}
