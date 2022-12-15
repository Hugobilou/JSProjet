let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let history = [];
let redoOn = false;

function viewportChange(){
    canvas.height = document.querySelector('body').clientHeight - document.querySelector('nav').clientHeight -12;
    canvas.width = document.querySelector('body').clientWidth -12;
    canvas.style.height = document.querySelector('body').clientHeight - document.querySelector('nav').clientHeight -12;
    canvas.style.width = document.querySelector('body').clientWidth -12;
}

function reset(){
    ctx.closePath();
    canvas.dataset.draw = 'none'
    document.querySelector('body').style.cursor = 'default';
}

function keydown(event){
    if (event.ctrlKey && event.key.toLowerCase() == 'z' && canvas.dataset.draw == 'none'){
        reset();
        redo();
    }
}

function drawType(event){
    reset();
    if (event.target.id == 'draw-line'){
        canvas.dataset.type = 'line';
        document.querySelector('.active').classList.remove('active');
        event.target.classList.add('active');
    }
    else if (event.target.id == 'draw-rectangle'){
        canvas.dataset.type = 'rectangle';
        document.querySelector('.active').classList.remove('active');
        event.target.classList.add('active');
    }
}

function draw(event){
    if(canvas.dataset.type == 'line'){
        drawLine(event);
    }
    else if(canvas.dataset.type == 'rectangle'){
        drawRectangle(event);
    }
}

function drawLine(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop){
    if (canvas.dataset.draw == 'none'){
        ctx.beginPath();
        ctx.moveTo(clientX, clientY);
        canvas.dataset.draw = 'drawing';
        if (!redoOn){
            document.querySelector('body').style.cursor = 'crosshair';
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
        ctx.stroke();
        ctx.closePath();
        canvas.dataset.draw = 'none'
        if (!redoOn){
            document.querySelector('body').style.cursor = 'default';
            canvas.removeEventListener('mousemove', drawLineMouseMove);
            history[history.length-1].x = clientX;
            history[history.length-1].y = clientY;
        }
    }
}

function drawLineMouseMove(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop){
    ctx.lineTo(clientX, clientY);
    ctx.stroke();
    ctx.closePath();
    history[history.length-1].x = clientX;
    history[history.length-1].y = clientY;
    redo(true);
    canvas.dataset.draw = 'drawing';
}

function drawRectangle(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop){
    if (canvas.dataset.draw == 'none'){
        ctx.beginPath();
        canvas.dataset.draw = 'drawing';
        if (!redoOn){
            history.push({
                type: 'rectangle',
                initX: clientX,
                initY: clientY,
            })
            document.querySelector('body').style.cursor = 'crosshair';
            canvas.addEventListener('mousemove', drawRectangleMouseMove);
        }
    }
    else if (canvas.dataset.draw == 'drawing'){
        ctx.moveTo(0,0);
        ctx.rect(history[history.length-1].initX, history[history.length-1].initY, clientX - history[history.length-1].initX, clientY - history[history.length-1].initY);
        ctx.stroke();
        ctx.closePath();
        canvas.dataset.draw = 'none'
        if (!redoOn){
            canvas.removeEventListener('mousemove', drawRectangleMouseMove);
            document.querySelector('body').style.cursor = 'default';
            history[history.length-1].x = clientX;
            history[history.length-1].y = clientY;
        }
    }
}

function drawRectangleMouseMove(event, clientX = event.clientX - canvas.offsetLeft, clientY = event.clientY - canvas.offsetTop){
    ctx.rect(history[history.length-1].initX, history[history.length-1].initY, clientX - history[history.length-1].initX, clientY - history[history.length-1].initY);
    ctx.stroke();
    history[history.length-1].x = clientX;
    history[history.length-1].y = clientY;
    redo(true);
    canvas.dataset.draw = 'drawing'
}

function redo(move = false){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    canvas.dataset.draw = 'none';
    redoOn = true;
    if(!move) history.pop();
    for (let i = 0; i < history.length; i++){
        if (history[i].type == 'line'){
            drawLine(null, history[i].initX, history[i].initY);
            drawLine(null, history[i].x, history[i].y);
        }
        else if (history[i].type == 'rectangle'){
            console.log(history);
            drawRectangle(null, history[i].initX, history[i].initY);
            drawRectangle(null, history[i].x, history[i].y);
        }
    }
    redoOn = false;
}

viewportChange();
window.addEventListener('resize', viewportChange);
document.getElementById('canvas').addEventListener('click', draw);
document.querySelector('nav').addEventListener('click', drawType);
document.addEventListener('keyup', keydown);