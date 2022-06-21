var cnv;
var brushSize = document.getElementById("sizeBox");
var brushColor = "black";

function setup() {
    cnv = createCanvas(900, 500)
    cnv.parent("holder");
    background("white");
    frameRate(60);
}

function draw() {
    brushColor = document.getElementById("colorBox").value;

    if (mouseButton == LEFT && mouseIsPressed) {
        strokeWeight(brushSize.value);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
    if (keyCode == 16 && keyIsPressed) {
        //erase();
        fill("white");
        stroke("white");
    }
    else {
        fill(brushColor);
        stroke(brushColor);
        noErase();
    }
}

function mouseWheel(event) {
    var x = brushSize.value;
    x = parseFloat(x) + (-1 * (event.delta / 16));
    if (x <= 0)
        x = 1;
    document.getElementById("sizeBox").value = x;
}