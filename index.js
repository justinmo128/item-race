// Canvas and graphics context
let cnv = document.getElementById("boundaries-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;

// Global Variables
let rect1 = {
    x: 160,
    y: 190,
    w: 50,
    h: 50
}
let rect2 = {
    x: 400,
    y: 190,
    w: 50,
    h: 50
}
let rect1keys = ["a", "s", "w", "d"];
let rect1move = [false, false, false, false];
let rect2keys = ["ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"];
let rect2move = [false, false, false, false];

// Draw Function
window.addEventListener("load", draw);
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    ctx.lineWidth = 2;

    ctx.fillStyle = "blue";
    ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h);
    ctx.fillStyle = "green";
    ctx.fillRect(rect2.x, rect2.y, rect2.w, rect2.h);

    moveRect();

    requestAnimationFrame(draw);
}

function moveRect() {
    // Rect1
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

    // Rect2
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

// Event Listeners & Handlers
// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
        
    for (let i = 0; i < 4; i++) {
        if (keyPressed === rect1keys[i]) {
            rect1move[i] = true;
        }
        if (keyPressed === rect2keys[i]) {
            rect2move[i] = true;
        }
    }
})

// Key up handler
window.addEventListener("keyup", (e) => {
    let keyPressed = e.key;

    for (let i = 0; i < 4; i++) {
        if (keyPressed === rect1keys[i]) {
            rect1move[i] = false;
        }
        if (keyPressed === rect2keys[i]) {
            rect2move[i] = false;
        }
    }
})