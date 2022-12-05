// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (keyPressed === " ") {
        p1Move = !p1Move;
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
})