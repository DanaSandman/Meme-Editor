'use strict'
console.log('im the best main service')

var gCanvas;
var gCtx;
var gImgs;
// var gKeywords = {'happy': 12,'funny puk': 1}
_creatImgs()

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 20,
        align: 'left',
        color: 'red'
    }, {
        txt: '',
        size: 20,
        align: 'left',
        color: 'red'
    }]
};

function _createImg(id) {
    var img = {
        id,
        url: `imgs/${id}.jpg`,
        keywords: ['happy']
    }
    return img
}

function _creatImgs() {
    var imgs = [
        _createImg(1),
        _createImg(10)
    ];
    gImgs = imgs;

}

function creatCanvas() {
    gCanvas = document.querySelector('.meme-canvas')
    gCtx = gCanvas.getContext('2d');
}

function getImgsForDisplay() {
    return gImgs
}

function getImgsById(imgId) {
    var img = gImgs.find(function (img) {
        return imgId === img.id
    })
    return img
}

function drawImg() {
    let elImg = new Image()
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        addTxt()
    }
    var imgUrl = gImgs.filter(img =>
        img.id === gMeme.selectedImgId
    );
    elImg.src = `${imgUrl[0].url}`;
}

function addTxt() {
    gCtx.font = '40pt IMPACT';
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.stroke();
    gCtx.fill()
    gCtx.fillText(gMeme.lines[0].txt, 50, 50);

}

function updateTxt(txt) {
    gMeme.lines[0].txt = txt
}