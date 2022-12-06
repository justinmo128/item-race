// Canvas and graphics context
let cnv = document.getElementById("itemrace-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;

let scoreCnv = [];
let scoreCtx = [];
scoreCnv[0] = document.getElementById("p1score-canvas");
scoreCtx[0] = scoreCnv[0].getContext("2d");
scoreCnv[0].width = 100;
scoreCnv[0].height = 100;

scoreCnv[1] = document.getElementById("p2score-canvas");
scoreCtx[1] = scoreCnv[1].getContext("2d");
scoreCnv[1].width = 100;
scoreCnv[1].height = 100;

// Global Variables
let rect1 = {
    x: 270,
    y: 215,
    w: 50,
    h: 50
}
let rect2 = {
    x: 320,
    y: 215,
    w: 50,
    h: 50
}
let rect1keys = ["a", "s", "w", "d"];
let rect1move = [false, false, false, false];
let rect2keys = ["ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"];
let rect2move = [false, false, false, false];
let p1Move = !!Math.round(Math.random());
let items = [];
let score = [-1, -1];
let p1Points = -1;
let p2Points = -1;
let gameState = "start";
class Item {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.collected = false;
    }
}

for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 9; j++) {
        let x = 20 + i * 45;
        let y = 21 + j * 54;
        items[j * 15 + i] = new Item(x, y)
    }
}

// Draw Function
window.addEventListener("load", draw);
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height)
    
    drawItems();
    detectCollison();
    drawScore();
    if (gameState === "start") {
        drawP2();
        drawP1();
        ctx.fillStyle = "black";
        ctx.fillRect(145, 380, 350, 30);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "30px Roboto";
        ctx.fillText("Press enter to start.", 320, 400)
    } else if (gameState === "gameLoop") {
        if (p1Move) {
            drawP2();
            drawP1();
            moveRect1();
        } else {
            drawP1();
            drawP2();
            moveRect2();
        }
        // if (score[0] + score[1] >= 124) {
        //     endGame();
        // }
    } else if (gameState === "end") {
        drawEnd();
    }

    setTimeout(draw, 1000/60);
}

function drawItems() {
    ctx.fillStyle = "yellow";
    for (let i = 0; i < items.length; i++) {
        if (items[i].collected === false) {
            ctx.fillRect(items[i].x, items[i].y, 10, 10)
        }
    }
}

function detectCollison() {
    for (let i = 0; i < items.length; i++) {
        if (items[i].x + 5 >= rect1.x &&
            items[i].x + 5 <= rect1.x + rect1.w &&
            items[i].y + 5 >= rect1.y &&
            items[i].y + 5 <= rect1.y + rect1.h &&
            items[i].collected === false) {
                items[i].collected = true;
                score[0]++;
        }
        if (items[i].x + 5 >= rect2.x &&
            items[i].x + 5 <= rect2.x + rect2.w &&
            items[i].y + 5 >= rect2.y &&
            items[i].y + 5 <= rect2.y + rect2.h &&
            items[i].collected === false) {
                items[i].collected = true;
                score[1]++;
        }
    }
}

function drawScore() {
    for (let i = 0; i < 2; i++) {
        scoreCtx[i].fillStyle = "black";
        scoreCtx[i].fillRect(0, 0, 100, 100);
        scoreCtx[i].fillStyle = "white";
        scoreCtx[i].textAlign = "center";
        scoreCtx[i].font = "70px Roboto";
        scoreCtx[i].fillText(score[i], 50, 75);
    }
}

function drawP1() {
    ctx.fillStyle = "blue";
    ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h);
    if (!p1Move) {
        ctx.fillStyle = "black";
        ctx.fillRect(rect1.x + 4, rect1.y + 4, rect1.w - 8, rect1.h - 8);
    }
}

function drawP2() {
    ctx.fillStyle = "green";
    ctx.fillRect(rect2.x, rect2.y, rect2.w, rect2.h);
    if (p1Move) {
        ctx.fillStyle = "black";
        ctx.fillRect(rect2.x + 4, rect2.y + 4, rect2.w - 8, rect2.h - 8);
    }
}

function moveRect1() {
    // Movement
    if (rect1move[0]) {
        rect1.x -= 3
    }
    if (rect1move[1]) {
        rect1.y += 3
    }
    if (rect1move[2]) {
        rect1.y -= 3
    }
    if (rect1move[3]) {
        rect1.x += 3
    }
    // Boundaries
    if (rect1.x + rect1.w < 0) {
        rect1.x = cnv.width
    } else if (rect1.x > cnv.width) {
        rect1.x = 0 - rect1.w
    }
    if (rect1.y + rect1.h < 0) {
        rect1.y = cnv.height
    } else if (rect1.y > cnv.height) {
        rect1.y = 0 - rect1.h
    }
}

function moveRect2() {
    // Movement
    if (rect2move[0]) {
        rect2.x -= 3
    }
    if (rect2move[1]) {
        rect2.y += 3
    }
    if (rect2move[2]) {
        rect2.y -= 3
    }
    if (rect2move[3]) {
        rect2.x += 3
    }
    // Boundaries
    if (rect2.x + rect2.w < 0) {
        rect2.x = cnv.width
    } else if (rect2.x > cnv.width) {
        rect2.x = 0 - rect2.w
    }
    if (rect2.y + rect2.h < 0) {
        rect2.y = cnv.height
    } else if (rect2.y > cnv.height) {
        rect2.y = 0 - rect2.h
    }
}

function endGame() {
    gameState === "end";
    setTimeout(reset, 3000)
}

function drawEnd() {
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "70px Roboto";
    if (score[0] > score[1]) {
        ctx.fillText("Blue wins!", 320, 400)
    } else if (score[0] < score[1]) {
        ctx.fillText("Green wins!", 320, 400)
    } else {
        ctx.fillText("Draw!", 320, 400)
    }
}

function reset() {
    rect1 = {
        x: 270,
        y: 215,
        w: 50,
        h: 50
    }
    rect2 = {
        x: 320,
        y: 215,
        w: 50,
        h: 50
    }
    p1Move = !!Math.round(Math.random());
    score[0] = -1;
    score[1] = -1;
    for (let i = 0; i < items.length; i++) {
        items[i].collected = false;
    }
    gameState = "start";
}