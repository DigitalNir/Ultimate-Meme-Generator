'use strict'

function onInitGallery() {
  renderGallery()
}

function onImgSelect(ev) {
  const imgId = +ev.target.dataset.imgId
  setImg(imgId)
  renderMeme()
}

function renderGallery() {
  const images = getImages()
  const elGallery = document.querySelector('.section-gallery')
  console.log('images:', images)
  images.forEach((image) => {
    const elImg = new Image()
    elImg.src = image.imgUrl
    elImg.dataset.imgId = image.imgId
    elGallery.appendChild(elImg)
  })
}
