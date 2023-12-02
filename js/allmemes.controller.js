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
    elImg.setAttribute('onclick', `onMemeSelect(${meme.memeId}, event)`)

    elAllMemes.appendChild(elImg)
  })
}

function onMemeSelect(memeId, ev) {
  //   ev.preventDefault()
  ev.stopPropagation()
  console.log('memeId:', memeId)
  console.log('ev.target:', ev.target)
  const meme = gAllMemes.find((meme) => meme.memeId === memeId)
  setCurrentMeme(meme)

  const elAllMemes = document.querySelector('.section-allmemes')
  elAllMemes.classList.add('is-hidden')

  const elEditor = document.querySelector('.section-editor')
  elEditor.classList.remove('is-hidden')

  //   console.log('elAllMemes:', elAllMemes)
  //   console.log('elEditor:', elEditor)
  //   debugger
  // ev.preventDefault()
}

function onSaveMeme() {
  const dataUrl = getCanvasAsDataUrl()
  setMemeDataURL(dataUrl)
  saveMeme()
  renderAllMemes()
}

function onShowAllMemes() {
  document.querySelector('.section-editor').classList.add('is-hidden')
  document.querySelector('.section-allmemes').classList.remove('is-hidden')
  document.querySelector('.section-gallery').classList.add('is-hidden')
}
