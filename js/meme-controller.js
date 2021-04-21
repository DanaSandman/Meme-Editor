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
    if (gImgs[gMeme.selectedImgId].id !== 18) {
        renderCanvas()
        renderControlPanel()
    } else if (gImgs[gMeme.selectedImgId].id === 18) {
        renderControlPanel()
    }
}

function renderCanvas(img) {
    if (gImgs[gMeme.selectedImgId].id !== 18) {
        creatCanvas()
        document.querySelector('.meme-canvas').innerHTML = `"${gCanvas}"`
        drawImg()
    } else if (gImgs[gMeme.selectedImgId].id === 18) {
        gCanvas.width = 500;
        gCanvas.height = 500;
        gCtx.drawImage(img, 0, 0, 500, 500);
        drowTxt()
    }
}

function renderControlPanel() {
    var lines = getLinesForDisplay()
    var strHTML = ''
    lines.forEach(function (line, idx) {
        strHTML += `
            <div class="line">
            <input class="input-txt" type="text" placeholder="Text line1"
            oninput="onInputTyping(this.value,${idx})">
          <div class="control-box flex">
            <div class="txt-size">
                <button class="btn-size-minus" onclick="onChangeTxtSize(${idx}, 10)"><img src="./imgs/imgs-utils/icons/increase font - icon.png"></button>
                <button class="btn-size-plus" onclick="onChangeTxtSize(${idx}, -10)"><img src="./imgs/imgs-utils/icons/decrease font - icon.png"></button>
            </div>
            <div class="txt-move">
                <button class="btn-move-down" onclick="onMoveDown(${idx})"><img src="./imgs/imgs-utils/icons/down.png"></button>
                <button class="btn-move-up" onclick="onMoveUp(${idx})"><img src="./imgs/imgs-utils/icons/up.png"></button>
            </div>
            <div class="remov-line"><button onclick="onRemoveLine(${idx})"><img src="./imgs/imgs-utils/icons/trash.png"></button></div>
        </div>
        <div>
            <input type="color" id="body" name="body"
            value="#f6b73c" onchange="onColorChange(value)">
            <label for="body"></label>
            <input type="color" id="body" name="body"
            value="#f6b73c" onchange="onChangeStroke(value)">
            <label for="body"></label>
        </div>
        </div>`
    });
    strHTML += '<div class="flex"><div class="switch-line"> <button class="btn-switch-lines" onclick="onSwitchLines()"><img src="./imgs/imgs-utils/icons/up-and-down-opposite-double-arrows-side-by-side.png"></button></div> <div class="add-line"><button onclick="onAddLine()"><img src="./imgs/imgs-utils/icons/add.png"></button></button></div></div>'

    document.querySelector('.control-panel').innerHTML = strHTML;

}

function onCloseEditor() {
    document.querySelector('.meme-editor-modali').style.display = "none";
}

// TEXT
function onInputTyping(txt, idx) {
    gMeme.selectedLineIdx = idx
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
    var line1 = gMeme.lines[0].y
    gMeme.lines[0].y = gMeme.lines[1].y
    gMeme.lines[1].y = line1
    renderEditor()
}

function onRemoveLine(idx) {
    removeLine(idx)
    renderEditor()
}

function onAddLine() {
    addLine()
    renderEditor()
}

// DOWNLOAD
function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

// UPLOAD
function onImgInput(ev) {
    creatCanvas()
    var img = {
        id: gImgs.length,
        url: ev,
        keywords: ['happy']
    }
    gImgs.push(img)
    onOpenEditor(img.id)
    gMeme.selectedImgId = img.id
    console.log('gMeme.selectedImgId', gMeme.selectedImgId)
    loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            onImageReady(img)
            drowTxt()
            reader.readAsDataURL(ev.target.files[0]);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}