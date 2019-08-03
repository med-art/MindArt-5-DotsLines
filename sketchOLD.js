let dotQtyX, dotQtyY;
let spaceX, spaceY;
let noiseAmplification;

let wmax, hmax, longEdge, shortEdge, lmax; // lmax is longest edge/100;

let tempMouseX, tempMouseY;

let bg, dotLayer, staticDraw, activeDraw;

function preload() {
  bg = loadImage('assets/paper.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  dimensionCalc();


  dotLayer = createGraphics(width, height);
  staticDraw = createGraphics(width, height);
  activeDraw = createGraphics(width, height);

  dotLayer.strokeWeight(lmax * 1.2);
  dotLayer.stroke(0);
strokeWeight(lmax * 0.65);
  stroke(0);

}

function dimensionCalc() {
  wmax = width / 100;
  hmax = height / 100;
  if (width > height) {
    longEdge = width;
    shortEdge = height;
    lmax = width / 100;
  } else {
    longEdge = height;
    shortEdge = width;
    lmax = height / 100;
  }
}

function newGrid() {
  backdrop();
  spaceX = width/dotQtyX;
  spaceY = height/dotQtyY;

  for (let i = 0; i < dotQtyX; i++) {
    for (let j = 0; j < dotQtyY; j++) {
      dotLayer.point(i*spaceX, j*spaceY);
    }
  }
  image(dotLayer, 0, 0, width, height);
}

function mousePressed(){
tempMouseX = mouseX;
tempMouseY= mouseY;
  }

function mouseDragged(){
backdrop();
  image(dotLayer, 0,0, width, height);
    line(tempMouseX, tempMouseY, mouseX, mouseY);
}


function draw(){

}


function backdrop() {
  blendMode(BLEND);
  image(bg, 0, 0, width, height); // display backgrond
}

function keyPressed() {
  dotQtyX = int(random(3, 10));
  dotQtyY = int(random(3, 10));
  newGrid();
}
