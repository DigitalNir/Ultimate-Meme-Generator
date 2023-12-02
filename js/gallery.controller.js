'use strict'

function onInitGallery() {
  renderGallery()
}

function renderGallery() {
  const images = getImages()
  const elGallery = document.querySelector('.section-gallery')
  images.forEach((image) => {
    const elImg = new Image()
    elImg.src = image.imgUrl
    elImg.dataset.imgId = image.imgId
    elGallery.appendChild(elImg)
  })
}

function onImgSelect(ev) {
  if (ev.target.tagName !== 'IMG') return

  const imgId = +ev.target.dataset.imgId
  setImg(imgId)
  renderMeme()
  document.querySelector('.section-editor').classList.remove('is-hidden')
  document.querySelector('.section-gallery').classList.add('is-hidden')
}

function onShowGallery() {
  document.querySelector('.section-gallery').classList.remove('is-hidden')
  document.querySelector('.section-allmemes').classList.add('is-hidden')
  document.querySelector('.section-editor').classList.add('is-hidden')
}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}
