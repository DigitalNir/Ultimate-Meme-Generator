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
    const containerSavedMeme = document.createElement('div')
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('data-meme-id', meme.memeId)

    containerSavedMeme.className = 'container-saved-meme'
    deleteButton.className = 'btn btn-delete-meme'
    deleteButton.innerText = '✖'
    deleteButton.addEventListener('click', (event) => onDeleteMeme(event))

    const elImg = new Image()
    const dataUrl = getImgDataURL(meme)
    elImg.src = dataUrl
    elImg.setAttribute('data-meme-id', meme.memeId)
    elImg.setAttribute('onclick', `onMemeSelect('${meme.memeId}', event)`)
    containerSavedMeme.appendChild(elImg)
    containerSavedMeme.appendChild(deleteButton)
    elAllMemes.appendChild(containerSavedMeme)
  })
}

function onMemeSelect(memeId, ev) {
  //   ev.preventDefault()
  ev.stopPropagation()
  console.log('memeId:', memeId)
  console.log('ev.target:', ev.target)
  const meme = getMemeById(memeId)
  setCurrentMeme(meme)

  const elAllMemes = document.querySelector('.section-allmemes')
  elAllMemes.classList.add('is-hidden')

  const elEditor = document.querySelector('.section-editor')
  elEditor.classList.remove('is-hidden')
}

function onSaveMeme() {
  const dataUrl = getCanvasAsDataUrl()
  setMemeDataURL(dataUrl)
  saveMeme()
  renderAllMemes()
}

function onDeleteMeme(ev) {
  ev.stopPropagation()
  ev.preventDefault()
  const memeId = ev.target.dataset.memeId
  deleteMeme(memeId)
  console.log('Deleting...')
  renderAllMemes()
}

function onShowAllMemes() {
  document.querySelector('.section-editor').classList.add('is-hidden')
  document.querySelector('.section-allmemes').classList.remove('is-hidden')
  document.querySelector('.section-gallery').classList.add('is-hidden')
}
