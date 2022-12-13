let setTimeoutRunning = false;
let spaceIsHeld = false;
let spaceIsHeldEvenMore = false;

// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (gameState === "start" && keyPressed === "Enter") {
        gameState = "gameLoop";
    }
    if (keyPressed === " ") {
        if (!spaceIsHeld) {
            p1Move = !p1Move;
        }
        spaceIsHeld = true;
        if (!setTimeoutRunning) {
            setTimeout(() => {
                if (spaceIsHeld && !spaceIsHeldEvenMore) {
                    console.log("hi2")
                    spaceIsHeldEvenMore = true;
                    setTimeoutRunning = true;
                    p1Move = !p1Move;
                }
            }, 750);
        }
    }
        
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

    if (e.key === " ") {
        spaceIsHeld = false;
        spaceIsHeldEvenMore = false;
        setTimeoutRunning = false;
    }
})