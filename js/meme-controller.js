'use strict'
console.log('im the best controller')


function onOpenEditor(imgId) {
    gMeme.selectedImgId = imgId
    _creatCanvas()
    var elMemeEditor = document.querySelector('.meme-editor-modali');
    elMemeEditor.style.display = "block";
    elMemeEditor.querySelector('.meme-canvas').innerHTML = `"${gCanvas}"`
}
function onCloseEditor() {
     var elMeme = document.querySelector('.meme-editor-modali').style.display = "none";
}

function onAddTxt(){
    gMeme.lines.txt = document.querySelector('.input-txt').value
    console.log(gMeme.lines.txt)
    gCtx.font = '40pt IMPACT';
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white';
    gCtx.fillText(gMeme.lines.txt, 50, 50);
    // gCtx.clearRect(0,0,gCanvas.width, gCanvas.height)
    // _creatCanvas()
    // gCtx.lastValue = gMeme.lines.txt
}