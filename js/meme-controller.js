'use strict'
console.log('controller')

// HOME PAGE GALLERY
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

//MODAL EDITOR 
function onOpenEditor(imgId) {
    var elMemeEditor = document.querySelector('.meme-editor-modali');
    elMemeEditor.style.display = "block";
    gMeme.selectedImgId = imgId
    renderEditor()
}
function renderEditor() {
    renderCanvas()
    renderControlPanel()
}
function renderCanvas(){
    creatCanvas()
    document.querySelector('.meme-canvas').innerHTML = `"${gCanvas}"`
    drawImg()
}
function renderControlPanel(){
        var lines = getLinesForDisplay()
        var strHTML = ''
        var addStrHTML = ''
        lines.forEach(function (line,idx){
            strHTML+=`
            <div class="line">
            <input class="input-txt" type="text" placeholder="Text line1"
            oninput="onInputTyping(this.value,${idx})">
          <div class="control-box">
            <div class="txt-size">
                <button class="btn-size-minus" onclick="onChangeTxtSize(${idx}, 10)"><img src="./imgs/imgs-utils/icons/increase font - icon.png"></button>
                <button class="btn-size-plus" onclick="onChangeTxtSize(${idx}, -10)"><img src="./imgs/imgs-utils/icons/decrease font - icon.png"></button>
            </div>
            <div class="txt-move">
                <button class="btn-move-down" onclick="onMoveDown(${idx})">⬇</button>
                <button class="btn-move-up" onclick="onMoveUp(${idx})">⬆</button>
            </div>
            <div class="remov-line"><button onclick="onRemoveLine(${idx})">xdelet</button></div>
        </div>
        </div>`
        });
        strHTML += ' <div class="switch-line"> <button class="btn-switch-lines" onclick="onSwitchLines()"><img src="./imgs/imgs-utils/icons/up-and-down-opposite-double-arrows-side-by-side.png"></button></div>'
        strHTML +='<div class="add-line"><button onclick="onAddLine()">+add</button></div>'
        document.querySelector('.control-panel').innerHTML=strHTML;

}
function onCloseEditor() {
    document.querySelector('.meme-editor-modali').style.display = "none";
}

// TEXT
function onInputTyping(txt, idx) {
    gMeme.selectedLineIdx = idx
    updateTxt(txt)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    renderCanvas()
}
function onChangeTxtSize(idx, num) {
    gMeme.selectedLineIdx = idx
    changeTxtSize(num)
    renderCanvas()
}
function onMoveDown(idx) {
    gMeme.selectedLineIdx = idx
    moveTxt(+10)
    renderCanvas()
}
function onMoveUp(idx) {
    gMeme.selectedLineIdx = idx
    moveTxt(-10)
    renderCanvas()
}

// LINES
function onSwitchLines() {
    var line1 = gMeme.lines[0].y
    gMeme.lines[0].y = gMeme.lines[1].y
    gMeme.lines[1].y = line1
    renderEditor()
}
function onRemoveLine(idx){
    removeLine(idx)
    renderEditor()
}
function onAddLine(){
    addLine()
    renderEditor()
}