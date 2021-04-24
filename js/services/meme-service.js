'use strict'

const KEY = 'Memes'
var gImgs;
var gMyImgs = [];
var gMyMemes = [];
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
};

function init(){
_creatImgs()
_createLines()
}
// IMG
function _createImg(id) {
    var img = {
        id,
        url: `imgs/${id}.jpg`,
        keywords: ['happy']
    }
    return img
}
function _creatImgs() {
    var imgs = []
    for (var i =0; i < 18; i++) {
        imgs.push(_createImg(i))
    }
    gImgs = imgs;
}
function getImgsForDisplay(galleryType) 
{
    if (galleryType === 'main'){
    
        return gImgs

    } else if (galleryType === 'myGallery'){

        return gMyImgs
    }
    
}

// TEXT
function updateTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
function changeTxtSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size += (size)
    if (gMeme.lines[gMeme.selectedLineIdx].size >= 80) {
        gMeme.lines[gMeme.selectedLineIdx].size = 80
    } else if (gMeme.lines[gMeme.selectedLineIdx].size <= 10) {
        gMeme.lines[gMeme.selectedLineIdx].size = 10
    }
}
function moveTxt(move) {
    var newLocation = gMeme.lines[gMeme.selectedLineIdx].y + (move)
    gMeme.lines[gMeme.selectedLineIdx].y = newLocation
}

// LINES
function _createLine(y, x, txt) {
    var line = {
        txt: txt,
        size: 50,
        align: 'left',
        color: 'white',
        strokeStyle: 'black',
        y: y,
        x: x
    }
    return line
}
function _createLines() {
    gMeme.lines = [
        _createLine(70, 50, 'Text1'),
        _createLine(470, 50, 'Text2'),
    ]
}
function addLine() {

    if(!gMeme.lines.length >= 2){
        var line = _createLine(250, 50,'new Text')
    }else{
        var line = _createLine(getRandomInt(150, 350),50,'new Text')
    } 
    gMeme.lines.push(line)
}
function removeLine(idx) {
    gMeme.lines.splice(idx, 1)
    gMeme.selectedLineIdx = idx - 1
}
function getLinesForDisplay() {
    return gMeme.lines
}

// STORAGE
function saveMyMemes(meme){
    console.log('save meme', meme.selectedImgId)
    var myMeme = {
        selectedImgId: meme.selectedImgId,
        selectedLineIdx: meme.selectedLineIdx,
        lines: meme.lines
    }
    
    gMyMemes.push(myMeme)
    saveToStorage(KEY, gMyMemes)
}
function removeMeme(imgId){
    var img = gMyMemes.findIndex(function (meme) {
        return meme.selectedImgId === imgId
    })
    gMyMemes.splice(img, 1)
    saveToStorage(KEY, gMyMemes)
}

// function updateMeme(){

// }
// UPLOAD
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn-facebook" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share to Facebook
        </a>`
    }
    doUploadImg(elForm, onSuccess);
}
function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}
function colorChange(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}
function StrokeChange(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeStyle = color
}
