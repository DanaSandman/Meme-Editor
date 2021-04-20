'use strict'
console.log('main service')

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
        size: 50,
        align: 'left',
        color: 'white',
        y: 70,
        x: 50
    }, {
        txt: '',
        size: 50,
        align: 'left',
        color: 'white',
        y: 470,
        x: 50
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

function updateTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function drowTxt() {
    gCtx.strokeStyle = 'black'
    // gCtx.stroke();
    // gCtx.fill()

    gMeme.lines.forEach(function (line) {
        gCtx.fillStyle = `${line.color}`;
        gCtx.font = `${line.size}pt IMPACT`;
        gCtx.fillText(line.txt, line.x, line.y);
    });

    // console.log('gMeme.lines[0].size ', gMeme.lines[0].size)
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