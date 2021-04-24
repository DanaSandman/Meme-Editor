'use strict'

{/* <div class="img-contianer grid-container flex-column"> */}
// </<div></div>
var gCanvas;
var gCtx;

// HOME PAGE GALLERY
function onInit(){
init()
renderGallery('main')
}
function renderGallery(galleryType) {

    var imgs = getImgsForDisplay(galleryType)
    var strHTML = '';

    imgs.map(function (imgOb) {
        if (galleryType === 'myGallery'){
        strHTML += `<div class=" img-contianer  flex-column"><img class="img-btn" src="${imgOb.url}" onclick="onOpenEditor(${imgOb.id})"><button class="btn-remove" onclick="onRemoveMeme(${imgOb.id})">remove</button></div>
        `
        }else{
            strHTML += `<img class="img-btn box" src="${imgOb.url}" onclick="onOpenEditor(${imgOb.id})">`
        }
    });
    var elGallery = document.querySelector('.image-gallery');
    elGallery.innerHTML = strHTML
}
//MODAL EDITOR 
function onOpenEditor(imgId) {

    gCanvas = document.querySelector('.meme-canvas')
    gCtx = gCanvas.getContext('2d');
    var elMemeEditor = document.querySelector('.meme-editor-modali');
    elMemeEditor.style.display = "block";

    var currentMeme = gMyMemes.filter((meme) => {
        console.log('meme.selectedImgId', meme.selectedImgId)
        return meme.selectedImgId === imgId
    })

    if (!currentMeme.length){
        gMeme.selectedImgId = imgId
    } else if (currentMeme.length) {
        gMeme = currentMeme[0]
    }

    renderEditor()
}
function renderEditor() {
    if (gMeme.selectedImgId !== 18) {
        renderCanvas()
        renderControlPanel()
    } else if (gMeme.selectedImgId === 18) {
        renderControlPanel()
    }
    document.querySelector('.input-txt').value = gMeme.lines[gMeme.selectedLineIdx].txt ;
}
function renderCanvas(img) {
    if (gMeme.selectedImgId !== 18) {
        document.querySelector('.meme-canvas').innerHTML = `"${gCanvas}"`
        // reSizeCanvas()
        drawImg()
    }
}
function renderControlPanel() {
    var strHTML = ''
        strHTML += `
    <div class="control-box">
    <section class="txt-input-line flex justify-content">
    <input class="input-txt" type="text" placeholder="Text line1"
        oninput="onInputTyping(this.value,${gMeme.selectedLineIdx})">
    </section>
        <section class="lines-control flex justify-content">
            <div class="switch-line"><button class="btn-switch-lines" onclick="onSwitchLines()"><img
                        src="./imgs/imgs-utils/icons/up-and-down-opposite-double-arrows-side-by-side.png"></button>
            </div>
            <div class="add-line"><button onclick="onAddLine()"><img src="./imgs/imgs-utils/icons/add.png"></button>
            </div>
            <div class="remov-line"><button onclick="onRemoveLine(${gMeme.selectedLineIdx})"><img
                        src="./imgs/imgs-utils/icons/trash.png"></button>
            </div>
        </section>
        <section class="text-control flex justify-content">
            <div class="txt-size flex">
                <button class="btn-size-minus" onclick="onChangeTxtSize(${gMeme.selectedLineIdx}, 10)"><img
                        src="./imgs/imgs-utils/icons/increase font - icon.png"></button>
                <button class="btn-size-plus" onclick="onChangeTxtSize(${gMeme.selectedLineIdx}, -10)"><img
                        src="./imgs/imgs-utils/icons/decrease font - icon.png"></button>
                        <div class="text-aling">
                        <button class="btn-aling-left" onclick="onAlignLeft(${gMeme.selectedLineIdx})"><img
                                src="./imgs/imgs-utils/icons/align-to-left.png"></button>
                        <button class="btn-aling-left" onclick="onAlignCenter(${gMeme.selectedLineIdx})"><img
                                src="./imgs/imgs-utils/icons/aling-to-center.png"></button>
                        <button class="btn-aling-left" onclick="onAlignRight(${gMeme.selectedLineIdx})"><img
                                src="./imgs/imgs-utils/icons/align-to-right.png"></button>
                    </div>
          </section>  
           <section class="colors-and-move flex justify-content">
                   <button class="btn-move-down" onclick="onMoveDown(${gMeme.selectedLineIdx})"><img
                   src="./imgs/imgs-utils/icons/down.png"></button>
                   <button class="btn-move-up" onclick="onMoveUp(${gMeme.selectedLineIdx})"><img
                   src="./imgs/imgs-utils/icons/up.png"></button>
                   <div class="colors">
                   <button><input type="color" id="color-fill" name="color-fill" value="#f6b73c" onchange="onColorChange(value)">
                   <label for="color-fill"><img
                               src="./imgs/imgs-utils/icons/paint-board-and-brush.png"></label></button>
                 <button><input type="color" id="color-stroke" name="color-stroke" value="#f6b73c"
                       onchange="onChangeStroke(value)">
                   <label for="color-stroke"><img src="./imgs/imgs-utils/icons/text-stroke.png"></label></button>
           </section> 
  </div>`
    document.querySelector('.control').innerHTML = strHTML;
}
function onCloseEditor() {
    document.querySelector('.meme-editor-modali').style.display = "none";
    onInit()
}

// IMG
function drawImg() {
    let elImg = new Image()
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        drowTxt()
    }
    var imgUrl = gImgs.filter(img =>
        img.id === gMeme.selectedImgId
    );
    elImg.src = `${imgUrl[0].url}`;
}
function drowTxt() {
    gMeme.lines.forEach(function (line) {
        gCtx.font = `${line.size}pt IMPACT`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.strokeStyle= `${line.strokeStyle}`;
        gCtx.lineWidth = 3
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y)
    });
}
///////
// function reSizeCanvas(){
//     var elCanvasPanel = document.querySelector('.canvas-panel');
//     console.log('gCanvas.width',gCanvas.width)
//     console.log('gCanvas.height',gCanvas.height)

//     // gCanvas.width = elCanvasPanel.offsetWidth
//     // // gCanvas.height = elCanvasPanel.offsetHeight
//     // console.log('elCanvasPanel.offsetWidth',elCanvasPanel.offsetWidth)
//     // console.log('elCanvasPanel.offsetheight',elCanvasPanel.offsetheight)
// }

// TXT
function onInputTyping(txt, idx) {
    if(gMeme.lines.length === 0){
        gMeme.selectedLineIdx=0
        addLine()
    }
    updateTxt(txt)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    renderCanvas(idx)
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
function onColorChange(value){
    colorChange(value)
    renderCanvas()
}
function onChangeStroke(value){
    StrokeChange(value)
    renderCanvas()
}

// LINES
function onSwitchLines() {
if(gMeme.selectedLineIdx  ===  gMeme.lines.length-1){
    gMeme.selectedLineIdx = 0
}else{
    gMeme.selectedLineIdx++
}
    renderEditor()
}
function onRemoveLine(idx) {
    removeLine(idx)
    renderEditor()
}
function onAddLine() {
    addLine()
    gMeme.selectedLineIdx = gMeme.lines.length-1
    renderEditor()
}
function onAlignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
    gMeme.lines[gMeme.selectedLineIdx].x = 10
    renderCanvas()
}
function onAlignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    gMeme.lines[gMeme.selectedLineIdx].x  = 165
    renderCanvas()
}
function onAlignRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
    gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width - (gMeme.lines[gMeme.selectedLineIdx].size * 0.7 * gMeme.lines[gMeme.selectedLineIdx].txt.length +10)
    renderCanvas()
}

// MY MEMES
function onSaveMyMemes(){
 saveMyMemes(gMeme)
 alert('SAVED SUCCESSFULLY')
}
function onRemoveMeme(imgId){
    removeMeme(imgId)
    readMyMemes()
}
function readMyMemes(){
    gMyImgs = []    
    gMyMemes = loadFromStorage(KEY)
    gMyMemes.map(function(myMeme){  
        gMyImgs.push(_createImg(myMeme.selectedImgId))
    });
    document.querySelector('.meme-editor-modali').style.display = "none";
    renderGallery('myGallery')
}

// DOWNLOAD
function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

// UPLOAD
function onImgInput(ev) {
    gCanvas = document.querySelector('.meme-canvas')
    gCtx = gCanvas.getContext('2d');
    // var url = (window.URL||window.webkitURL).createObjectURL(ev.target.files[0]);
    // var img = new Image();
    // img.src = URL.createObjectURL(ev.target.files[0])
    // console.log('ev', img.src)
    var img = {
        id: gImgs.length,
        url: ev,
        keywords: ['happy']
    }
    gImgs.push(img)
    onOpenEditor(img.id)
    gMeme.selectedImgId = img.id
    loadImageFromInput(ev, renderCanvas)
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();
    // reSizeCanvas()
    reader.onload = function (event) {
        drowTxt()
        var img = new Image();
        img.onload = function () {
            onImageReady(img)
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
            drowTxt()
            reader.readAsDataURL(ev.target.files[0]);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}