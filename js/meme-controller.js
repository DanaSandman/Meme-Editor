'use strict'
console.log('controller')

function onInit() {
    renderGallery()
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

function onInputTyping(txt, idx) {
    gMeme.selectedLineIdx = idx
    updateTxt(txt)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    renderEditor()
}

function onIncreaseTxt(idx) {
    gMeme.selectedLineIdx = idx
    changeTxtSize(-10)
    renderEditor()
}

function onDecreaseTxt(idx) {
    gMeme.selectedLineIdx = idx 
    changeTxtSize(+10)
    renderEditor()
}

function onMoveDown(idx) {
    gMeme.selectedLineIdx = idx
    moveTxt(+10)
    renderEditor()
}

function onMoveUp(idx) {
    gMeme.selectedLineIdx = idx
    moveTxt(-10)
    renderEditor()
}

function onSwitchLines() {
    var line1 = gMeme.lines[0].y
    gMeme.lines[0].y = gMeme.lines[1].y
    gMeme.lines[1].y = line1
    renderEditor()
}