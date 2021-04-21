'use strict'
console.log('main service')
const KEY = 'Memes'
var gCanvas;
var gCtx;
var gImgs;

_creatImgs()
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
};
_createLines()


// IMG
function _createImg(id) {
    var img = {
        id,
        url: `imgs/${id}.jpg`,
        keywords: ['happy']
    }
    return img
}
function _creatImgs(){
    var imgs = []
    for (var i=1 ; i <19 ; i++){
        imgs.push(_createImg(i)) 
    }
    gImgs = imgs;
}
function creatCanvas() {
    gCanvas = document.querySelector('.meme-canvas')
    gCtx = gCanvas.getContext('2d');
}
function getImgsForDisplay() {
    return gImgs
}
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
function getLinesForDisplay() {
    return gMeme.lines
}

// TEXT
function updateTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
function drowTxt() {
    gMeme.lines.forEach(function (line) {
        gCtx.font = `${line.size}pt IMPACT`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.strokeStyle= 'blck'
        gCtx.lineWidth = 3
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y)
    });
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
function _createLine(y,x){
var line = 
     {
            txt: '',
            size: 50,
            align: 'left',
            color: 'white',
            y: y,
            x: x
    }
    return line
}
function _createLines(){
    var lines = [
        _createLine(70,50),
        _createLine(470,50)
    ]
    gMeme.lines = lines
}
function removeLine(idx){
    gMeme.lines.splice(idx, 1)
}
function addLine() {
    var line =  _createLine(250, 50)
    gMeme.lines.unshift(line)
}

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