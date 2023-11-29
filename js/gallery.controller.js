'use strict'

function onInitGallery() {
  renderGallery()
}

function renderGallery() {
  const images = getImages()
  const elGallery = document.querySelector('.section-gallery')
  console.log('images:', images)
  images.forEach((image) => {
    const elImg = new Image()
    elImg.src = image.imgUrl
    elGallery.appendChild(elImg)
  })
}
