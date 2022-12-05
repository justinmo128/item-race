// Canvas and graphics context
let cnv = document.getElementById("boundaries-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;

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
let p1Points = -1;
let p2Points = -1;
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
console.log(items)

// Draw Function
window.addEventListener("load", draw);
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height)
    
    drawItems();
    if (p1Move) {
        drawP2();
        drawP1();
        moveRect1();
    } else {
        drawP1();
        drawP2();
        moveRect2();
    }

    console.log(p1Points, p2Points)
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
    // Collect points
    for (let i = 0; i < items.length; i++) {
        if (items[i].x + 10 >= rect1.x &&
            items[i].x <= rect1.x + rect1.w &&
            items[i].y + 10 >= rect1.y &&
            items[i].y <= rect1.y + rect1.h &&
            items[i].collected === false) {
                items[i].collected = true;
                p1Points++
        }
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
    // Collect points
    for (let i = 0; i < items.length; i++) {
        if (items[i].x + 10 >= rect2.x &&
            items[i].x <= rect2.x + rect2.w &&
            items[i].y + 10 >= rect2.y &&
            items[i].y <= rect2.y + rect2.h &&
            items[i].collected === false) {
                items[i].collected = true;
                p2Points++
        }
    }
}