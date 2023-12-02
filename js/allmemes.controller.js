function onInitAllMemes() {
  onShowAllMemes()
  renderAllMemes()
}

function renderAllMemes() {
  const elAllMemes = document.querySelector('.section-allmemes')
  elAllMemes.innerHTML = '' // Clear existing memes

  console.log('gAllMemes:', gAllMemes)

  const allMemes = getAllMemes()
  allMemes.forEach((meme) => {
    const elImg = new Image()
    const dataUrl = getImgDataURL(meme)
    elImg.src = dataUrl
    // meme.dataset.memeId = idx
    elImg.setAttribute('data-meme-id', meme.memeId)
    elAllMemes.appendChild(elImg)
  })
}

function onMemeSelect(ev) {
  if (ev.target.tagName !== 'IMG') return
}

function onSaveMeme() {
  const dataUrl = getCanvasAsDataUrl()
  setMemeDataURL(dataUrl)
  saveMeme()
  renderAllMemes()
}

function onShowAllMemes() {
  document.querySelector('.section-editor').classList.add('hidden')
  document.querySelector('.section-allmemes').classList.remove('hidden')
  document.querySelector('.section-gallery').classList.add('hidden')
}
