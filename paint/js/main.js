let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let history = [];
let historyOld = [];
let reDraw = false;
let globalFillColor = document.getElementById('fillColor').value;
let globalFill = document.getElementById('fill').checked;
let globalOutlineColor = document.getElementById('outlineColor').value;
let globalLineWidth = document.getElementById('linewidth').value;



function viewportChange(){
    let heightDiff = (document.querySelector('body').clientHeight - document.querySelector('nav').clientHeight -26) / canvas.height;
    let widthDiff = (document.querySelector('body').clientWidth -26) / canvas.width;
    canvas.height = document.querySelector('body').clientHeight - document.querySelector('nav').clientHeight -26;
    canvas.width = document.querySelector('body').clientWidth -26;
    canvas.style.height = document.querySelector('body').clientHeight - document.querySelector('nav').clientHeight -26;
    canvas.style.width = document.querySelector('body').clientWidth -26;

    for (const draw of history){
        for (let element in draw){
            if (element == 'type') continue;
            else if (Array.isArray(draw[element])){
                for (let i = 0; i < draw[element].length; i++){
                    if (element == 'initY' || element == 'y') draw[element][i] = draw[element][i] * heightDiff;
                    else if (element == 'initX' || element == 'x') draw[element][i] = draw[element][i] * widthDiff;
                    draw[element][i] = Math.floor(draw[element][i] * 100) / 100;
                }
            }
            else if (typeof(draw[element]) == 'number'){
                if (element == 'initY' || element == 'y') draw[element] = draw[element] * heightDiff; 
                else if (element == 'initX' || element == 'x') draw[element] = draw[element] * widthDiff;
                draw[element] = Math.floor(draw[element] * 100) / 100;
            } 
        }
    }
    for (const draw of historyOld){
        for (let element in draw){
            if (element == 'type') continue;
            else if (Array.isArray(draw[element])){
                for (let i = 0; i < draw[element].length; i++){
                    if (element == 'initY' || element == 'y') draw[element][i] = draw[element][i] * heightDiff;
                    else if (element == 'initX' || element == 'x') draw[element][i] = draw[element][i] * widthDiff;
                    draw[element][i] = Math.floor(draw[element][i] * 100) / 100;
                }
            }
            else if (typeof(draw[element]) == 'number'){
                if (element == 'initY' || element == 'y') draw[element] = draw[element] * heightDiff; 
                else if (element == 'initX' || element == 'x') draw[element] = draw[element] * widthDiff;
                draw[element] = Math.floor(draw[element] * 100) / 100;
            } 
        }
    }

    undo(true);
}

function fillColorRefresh(event){
    globalFillColor = document.getElementById('fillColor').value;
    event.currentTarget.style.backgroundColor = globalFillColor;
}

function outlineColorRefresh(event){
    globalOutlineColor = document.getElementById('outlineColor').value;
    event.currentTarget.style.backgroundColor = globalOutlineColor;
}

function lineWidthRefresh(){
    globalLineWidth = document.getElementById('linewidth').value;
}

function fillRefresh(){
    globalFill = document.getElementById('fill').checked;
}

function reset(){
    ctx.closePath();
    canvas.dataset.draw = 'none'
    document.querySelector('canvas').style.cursor = 'default';
}

function keydown(event){
    if (event.ctrlKey && event.key.toLowerCase() == 'z' && canvas.dataset.draw == 'none'){
        if (historyOld.length < history.length) historyOld = Array.from(history);
        reset();
        undo();
    }
    else if (event.ctrlKey && event.key.toLowerCase() == 'y' && canvas.dataset.draw == 'none' && historyOld.length > history.length){
        reset();
        redo();
        history = historyOld.slice(0,history.length+1);
    }
}

function navEvent(event){
    target = event.target
    if (target.id == 'draw-pen'){
        reset();
        canvas.dataset.type = 'pen';
        document.querySelector('.active').classList.remove('active');
        target.classList.add('active');
    }
    else if (target.id == 'draw-line'){
        reset();
        canvas.dataset.type = 'line';
        document.querySelector('.active').classList.remove('active');
        target.classList.add('active');
    }
    else if (target.id == 'draw-rectangle'){
        reset();
        canvas.dataset.type = 'rectangle';
        document.querySelector('.active').classList.remove('active');
        target.classList.add('active');
    }
    else if (target.id == 'draw-circle'){
        reset();
        canvas.dataset.type = 'circle';
        document.querySelector('.active').classList.remove('active');
        target.classList.add('active');
    }
    else if (target.id == 'undo' && canvas.dataset.draw == 'none'){
        if (historyOld.length < history.length) historyOld = Array.from(history);
        reset();
        undo();
    }
    else if (target.id == 'redo' && canvas.dataset.draw == 'none' && historyOld.length > history.length){
        reset();
        redo();
        history = historyOld.slice(0,history.length+1);
    }
    else if (target.id == 'reset'){
        reset();
        ctx.clearRect(0,0, canvas.width, canvas.height);
        historyOld = [];
        history = [];
    }
}

function draw(event){
    if(canvas.dataset.type == 'pen'){
        drawPen(event);
    }
    else if(canvas.dataset.type == 'line'){
        drawLine(event);
    }
    else if(canvas.dataset.type == 'rectangle'){
        drawRectangle(event);
    }
    else if(canvas.dataset.type == 'circle'){
        drawCircle(event);
    }
}

function drawPen(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop, outlineColor = globalOutlineColor, lineWidth = globalLineWidth){
    if (canvas.dataset.draw == 'none'){
        ctx.beginPath();
        ctx.moveTo(clientX, clientY);
        canvas.dataset.draw = 'drawing';
        if (!reDraw){
            historyOld = [];
            document.querySelector('canvas').style.cursor = 'cell';
            history.push({
                type: 'pen',
                initX: [clientX],
                initY: [clientY],
                x: [],
                y: []
            })
            canvas.addEventListener('mousemove', drawPenMouseMove);
        }
    }
    else if (canvas.dataset.draw == 'drawing'){
        ctx.lineTo(clientX, clientY);
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.closePath();
        canvas.dataset.draw = 'none'
        if (!reDraw){
            document.querySelector('canvas').style.cursor = 'default';
            canvas.removeEventListener('mousemove', drawPenMouseMove);
            history[history.length-1].x.push(clientX);
            history[history.length-1].y.push(clientY);
            history[history.length-1].outlineColor = outlineColor;
            history[history.length-1].lineWidth = lineWidth;
        }
    }
}

function drawPenMouseMove(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop){
    history[history.length-1].x.push(clientX);
    history[history.length-1].y.push(clientY);
    history[history.length-1].lineWidth = globalLineWidth;
    undo(true);
    canvas.dataset.draw = 'drawing';
    history[history.length-1].initX.push(clientX);
    history[history.length-1].initY.push(clientY);
}


function drawLine(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop, outlineColor = globalOutlineColor, lineWidth = globalLineWidth){
    if (canvas.dataset.draw == 'none'){
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.moveTo(clientX, clientY);
        ctx.lineWidth =globalLineWidth;
        canvas.dataset.draw = 'drawing';
        if (!reDraw){
            historyOld = [];
            document.querySelector('canvas').style.cursor = 'crosshair';
            history.push({
                type: 'line',
                initX: clientX,
                initY: clientY
            })
            canvas.addEventListener('mousemove', drawLineMouseMove);
        }
    }
    else if (canvas.dataset.draw == 'drawing'){
        ctx.lineTo(clientX, clientY);
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.closePath();
        canvas.dataset.draw = 'none'
        if (!reDraw){
            document.querySelector('canvas').style.cursor = 'default';
            canvas.removeEventListener('mousemove', drawLineMouseMove);
            history[history.length-1].x = clientX;
            history[history.length-1].y = clientY;
            history[history.length-1].outlineColor = outlineColor;
            history[history.length-1].lineWidth = lineWidth;
        }
    }
}

function drawLineMouseMove(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop){
    ctx.lineTo(clientX, clientY);
    ctx.lineWidth = globalLineWidth;
    ctx.stroke();
    ctx.closePath();
    history[history.length-1].x = clientX;
    history[history.length-1].y = clientY;
    history[history.length-1].fillColor = globalFillColor;
    history[history.length-1].outlineColor = globalOutlineColor;
    history[history.length-1].lineWidth = globalLineWidth;
    undo(true);
    canvas.dataset.draw = 'drawing';
}

function drawRectangle(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop, fillColor = globalFillColor, outlineColor = globalOutlineColor, lineWidth = globalLineWidth, fill = globalFill, drawTab = history[history.length-1]){
    if (canvas.dataset.draw == 'none'){
        ctx.beginPath();
        canvas.dataset.draw = 'drawing';
        if (!reDraw){
            historyOld = [];
            history.push({
                type: 'rectangle',
                initX: clientX,
                initY: clientY,
            })
            document.querySelector('canvas').style.cursor = 'crosshair';
            canvas.addEventListener('mousemove', drawRectangleMouseMove);
        }
    }
    else if (canvas.dataset.draw == 'drawing'){
        ctx.rect(drawTab.initX, drawTab.initY, clientX - drawTab.initX, clientY - drawTab.initY);
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = lineWidth;
        if (fill) ctx.fill();
        ctx.stroke();
        ctx.closePath();
        canvas.dataset.draw = 'none'
        if (!reDraw){
            canvas.removeEventListener('mousemove', drawRectangleMouseMove);
            document.querySelector('canvas').style.cursor = 'default';
            history[history.length-1].x = clientX;
            history[history.length-1].y = clientY;
            history[history.length-1].fillColor = fillColor;
            history[history.length-1].outlineColor = outlineColor;
            history[history.length-1].lineWidth = lineWidth;
            history[history.length-1].fill = fill;
        }
    }
}

function drawRectangleMouseMove(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop){
    ctx.rect(history[history.length-1].initX, history[history.length-1].initY, clientX - history[history.length-1].initX, clientY - history[history.length-1].initY);
    ctx.lineWidth = globalLineWidth;
    if (globalFill) ctx.fill();
    ctx.stroke();
    history[history.length-1].x = clientX;
    history[history.length-1].y = clientY;
    history[history.length-1].fillColor = globalFillColor;
    history[history.length-1].outlineColor = globalOutlineColor;
    history[history.length-1].lineWidth = globalLineWidth;
    history[history.length-1].fill = globalFill;
    undo(true);
    canvas.dataset.draw = 'drawing'
}

function drawCircle(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop, fillColor = globalFillColor, outlineColor = globalOutlineColor, lineWidth = globalLineWidth, fill = globalFill, drawTab = history[history.length-1]){
    if (canvas.dataset.draw == 'none'){
        ctx.beginPath();
        canvas.dataset.draw = 'drawing';
        if (!reDraw){
            historyOld = [];
            history.push({
                type: 'circle',
                initX: clientX,
                initY: clientY,
            })
            document.querySelector('canvas').style.cursor = 'crosshair';
            canvas.addEventListener('mousemove', drawCircleMouseMove);
        }
    }
    else if (canvas.dataset.draw == 'drawing'){
        let r = Math.floor(Math.sqrt(Math.pow((clientX - drawTab.initX), 2) + Math.pow((clientY - drawTab.initY), 2)));
        ctx.arc(drawTab.initX, drawTab.initY, r, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = lineWidth;
        if (fill) ctx.fill();
        ctx.stroke();
        ctx.closePath();
        canvas.dataset.draw = 'none'
        if (!reDraw){
            canvas.removeEventListener('mousemove', drawCircleMouseMove);
            document.querySelector('canvas').style.cursor = 'default';
            history[history.length-1].x = clientX;
            history[history.length-1].y = clientY;
            history[history.length-1].fillColor = fillColor;
            history[history.length-1].outlineColor = outlineColor;
            history[history.length-1].lineWidth = lineWidth;
            history[history.length-1].fill = fill;
            undo(true);
        }
    }
}

function drawCircleMouseMove(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop){
    let r = Math.floor(Math.sqrt(Math.pow((clientX - history[history.length-1].initX), 2) + Math.pow((clientY - history[history.length-1].initY), 2)));
    ctx.arc(history[history.length-1].initX, history[history.length-1].initY, r, 0, 2 * Math.PI);
    ctx.lineWidth = globalLineWidth;
    if (globalFill) ctx.fill();
    ctx.stroke();
    history[history.length-1].x = clientX;
    history[history.length-1].y = clientY;
    history[history.length-1].fillColor = globalFillColor;
    history[history.length-1].outlineColor = globalOutlineColor;
    history[history.length-1].lineWidth = globalLineWidth;
    history[history.length-1].fill = globalFill;
    undo(true);
    ctx.lineCap = 'round';
    ctx.moveTo(history[history.length-1].initX, history[history.length-1].initY);
    ctx.lineTo(clientX, clientY);
    ctx.stroke();
    canvas.dataset.draw = 'drawing'
}

function undo(refresh = false){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    canvas.dataset.draw = 'none';
    reDraw = true;
    if(!refresh) history.pop();
    for (let i = 0; i < history.length; i++){
        if (history[i].type == 'line'){
            drawLine(null, history[i].initX, history[i].initY, history[i].outlineColor, history[i].lineWidth);
            drawLine(null, history[i].x, history[i].y, history[i].outlineColor, history[i].lineWidth);
        }
        else if (history[i].type == 'rectangle'){
            drawRectangle(null, history[i].initX, history[i].initY, history[i].fillColor, history[i].outlineColor, history[i].lineWidth, history[i].fill, history[i]);
            drawRectangle(null, history[i].x, history[i].y, history[i].fillColor, history[i].outlineColor, history[i].lineWidth, history[i].fill, history[i]);
        }
        else if (history[i].type == 'circle'){
            drawCircle(null, history[i].initX, history[i].initY, history[i].fillColor, history[i].outlineColor, history[i].lineWidth, history[i].fill, history[i]);
            drawCircle(null, history[i].x, history[i].y, history[i].fillColor, history[i].outlineColor, history[i].lineWidth, history[i].fill, history[i]);
        }
        else if (history[i].type == 'pen'){
            for (let j = 0; j < history[i].initX.length-1; j++){
                drawLine(null, history[i].initX[j], history[i].initY[j], history[i].outlineColor, history[i].lineWidth);
                drawLine(null, history[i].x[j], history[i].y[j], history[i].outlineColor, history[i].lineWidth);
            }
        }
    }
    reDraw = false;
}

function redo(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    canvas.dataset.draw = 'none';
    reDraw = true;
    for (let i = 0; i <= history.length; i++){
        if (historyOld[i].type == 'line'){
            drawLine(null, historyOld[i].initX, historyOld[i].initY, historyOld[i].outlineColor, historyOld[i].lineWidth);
            drawLine(null, historyOld[i].x, historyOld[i].y, historyOld[i].outlineColor, historyOld[i].lineWidth);
        }
        else if (historyOld[i].type == 'rectangle'){
            drawRectangle(null, historyOld[i].initX, historyOld[i].initY, historyOld[i].fillColor, historyOld[i].outlineColor, historyOld[i].lineWidth, historyOld[i].fill, historyOld[i]);
            drawRectangle(null, historyOld[i].x, historyOld[i].y, historyOld[i].fillColor, historyOld[i].outlineColor, historyOld[i].lineWidth, historyOld[i].fill, historyOld[i]);
        }
        else if (historyOld[i].type == 'circle'){
            drawCircle(null, historyOld[i].initX, historyOld[i].initY, historyOld[i].fillColor, historyOld[i].outlineColor, historyOld[i].lineWidth, historyOld[i].fill, historyOld[i]);
            drawCircle(null, historyOld[i].x, historyOld[i].y, historyOld[i].fillColor, historyOld[i].outlineColor, historyOld[i].lineWidth, historyOld[i].fill, historyOld[i]);
        }
        else if (historyOld[i].type == 'pen'){
            for (let j = 0; j < historyOld[i].initX.length-1; j++){
                drawLine(null, historyOld[i].initX[j], historyOld[i].initY[j], historyOld[i].outlineColor, historyOld[i].lineWidth);
                drawLine(null, historyOld[i].x[j], historyOld[i].y[j], historyOld[i].outlineColor, historyOld[i].lineWidth);
            }
        }
    }
    reDraw = false;
}




viewportChange();
window.addEventListener('resize', viewportChange);
document.getElementById('canvas').addEventListener('click', draw);
document.querySelector('nav').addEventListener('click', navEvent);
document.addEventListener('keyup', keydown);
document.getElementById('fillColor').addEventListener('change', fillColorRefresh);
document.getElementById('outlineColor').addEventListener('change', outlineColorRefresh);
document.getElementById('fill').addEventListener('change', fillRefresh);
document.getElementById('linewidth').addEventListener('change', lineWidthRefresh);