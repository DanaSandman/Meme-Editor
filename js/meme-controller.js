'use strict'
console.log('im the best controller')

function onInit() {
    renderGallery()
    console.log("oninit")
}

function renderGallery() {
    var imgs = getImgsForDisplay()
    var strHTML = '';
    imgs.map(function (imgOb) {
        return strHTML += `<img class="img-btn" src="${imgOb.url}" onclick="onOpenEditor(${imgOb.id})">`
    });
    var elGallery = document.querySelector('.image-gallery');
    elGallery.innerHTML = strHTML
}

function onOpenEditor(imgId) {
    var elMemeEditor = document.querySelector('.meme-editor-modali');
    elMemeEditor.style.display = "block";
    gMeme.selectedImgId = imgId
    renderEditor()
}

function renderEditor() {
    creatCanvas()
    document.querySelector('.meme-canvas').innerHTML = `"${gCanvas}"`
    drawImg()
}

function onCloseEditor() {
    document.querySelector('.meme-editor-modali').style.display = "none";
}

function onInputTyping(txt) {
    updateTxt(txt)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    renderEditor()
}