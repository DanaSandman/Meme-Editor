'use strict'
console.log('im the best main service')

var gCanvas;
var gCtx;

// var gKeywords = {'happy': 12,'funny puk': 1}

var gImgs = [{
        id: 0,
        url: 'imgs/1.jpg',
        keywords: ['happy']
    },
    {
        id: 1,
        url: 'imgs/10.jpg',
        keywords: ['happy']
    }

];
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 20,
        align: 'left',
        color: 'red'
    }]
};

function onInit() {
    //render imgs  gallery
    //מערך של ותמנות 
    console.log("oninit")
}

function _creatCanvas() {
    gCanvas = document.querySelector('.meme-canvas')
    gCtx = gCanvas.getContext('2d');
    drawImg()
}

function drawImg() {
    const elImg = new Image()
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        onAddTxt()
    }
    var imgUrl = gImgs.filter(img =>
        img.id === gMeme.selectedImgId
    );
    elImg.src = `${imgUrl[0].url}`;
}