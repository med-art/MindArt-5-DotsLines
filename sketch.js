let dots = [];
let tempMouseX = 0;
let tempMouseY = 0;
let tempMouseX2 = 0;
let tempMouseY2 = 0;
let lineLayer, permaLine;
let dotSize = 400;
let dotQtyX, dotQtyY;
let spaceX, spaceY;
let noiseAmplification = 0;
let hueDrift, brightDrift, satDrift;
let throughDotCount;
let cloudHSB = [
  [225, 47, 55],
  [56, 92, 95],
  [28, 72, 95],
  [22, 59, 95],
  [11, 47, 65]
];

function preload() {

bg = loadImage('assets/paper.jpg');

}

function setup() {


  createCanvas(windowWidth, windowHeight);
  lineLayer = createGraphics(width, height);
  permaLine = createGraphics(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  lineLayer.colorMode(HSB, 360, 100, 100, 100);
    permaLine.colorMode(HSB, 360, 100, 100, 100);
  dimensionCalc();
  writeTextUI();
  makeGrid(2,2,0);

}

function writeTextUI() {
  textSize(longEdge / 50);
  fill(0);
  noStroke();

  button1 = createButton('Restart');
  button1.position((10 * lmax), windowHeight - lmax * 6);
  button2 = createButton('Next');
  button2.position(windowWidth - (10 * lmax) - (lmax * 10), windowHeight - lmax * 6);
  colH2 = color(130, 50, 50);
  colH1 = color(355, 50, 50);

  button1.style('background-color', colH1);
  button1.style('font-size', '2.1vmax');
  button1.style('color', 'white');
  button1.style('border-radius', '0.5vmax')
  button1.style('width', '14vmax')
  button1.mousePressed(setup);

  button2.style('background-color', colH2);
  button2.style('font-size', '2.1vmax');
  button2.style('color', 'white');
  button2.style('border-radius', '0.5vmax')
  button2.style('width', '14vmax')
  button2.mousePressed(nextGrid);

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

function makeGrid(x, y, noise) {
 image(bg, 0, 0, width, height);
  dotQtyX = x;
  dotQtyY = y;
  noiseAmp = noise;
  spaceX = width/(dotQtyX+2);
  spaceY = height/(dotQtyY+2);
  permaLine.clear();



  for (let i = 0; i < dotQtyX; i++) {
   dots[i] = [];
    for (let j = 0; j < dotQtyY; j++) {
      let noiseX = int((random(-width, width)*noise)/150);
      let noiseY = int((random(-height, height)*noise)/150);
      let r = random((width/dotSize), (width/dotSize)*4);
      dots[i][j] = new Dot(noiseX+(spaceX*1.5)+(spaceX*i), noiseY+(spaceY*1.5)+(spaceY*j), r);
    }
  }
}

function nextGrid(){

dotQtyX++;
dotQtyY++;
dotSize+=10;
noiseAmplification++;
  makeGrid(dotQtyX, dotQtyY, noiseAmplification);
}

function draw() {
image(bg, 0, 0, width, height);
  for (let i = 0; i < dotQtyX; i++) {
    for (let j = 0; j < dotQtyY; j++) {
    dots[i][j].move();
    dots[i][j].show();
  }
}
  image(lineLayer, 0, 0);
  image(permaLine, 0, 0);
}

function mousePressed() {

      let swatchTemp = int(random(0,5));
      colHue = cloudHSB[swatchTemp][0];
      colSat = cloudHSB[swatchTemp][1];
      colBri = cloudHSB[swatchTemp][2];

  }


function mouseDragged() {

  for (let i = 0; i < dotQtyX; i++) {
    for (let j = 0; j < dotQtyY; j++) {
    dots[i][j].clicked(mouseX, mouseY);
  }
}
  hueDrift = int(random(-2,2));
  satDrift = int(random(-2,2));
  brightDrift = int(random(-2,2));
  lineLayer.stroke(colHue+hueDrift, colSat+satDrift, colBri+brightDrift, 80);
  lineLayer.strokeWeight(5);
  lineLayer.clear();
  if (throughDotCount > 1){
  lineLayer.line(tempMouseX, tempMouseY, mouseX, mouseY);
}

}

function copyLine() {
  permaLine.stroke(colHue+hueDrift, colSat+hueDrift, colBri+brightDrift, 80);
  permaLine.strokeWeight(6);
  if (throughDotCount > 2) {
    permaLine.line(tempMouseX, tempMouseY, tempMouseX2, tempMouseY2);
  }
}

function mouseReleased() {
  lineLayer.clear();
  throughDotCount = 0;
}

class Dot {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 150;
    this.h = 0;
    this.s = 0;
    this.b = 80;
  }

  move() {
    // this.x = this.x + random(-2, 2);
    // this.y = this.y + random(-2, 2);
  }

  show() {
    stroke(60);
    strokeWeight(1);
    fill(this.h, this.s, this.b, 100);
    ellipse(this.x, this.y, this.r * 2);
  }

  clicked(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.r*2) {
      this.brightness = 250;
      this.h = colHue+hueDrift;
      this.s = colSat+satDrift;
      this.b = colBri+brightDrift;

      throughDotCount++;
      tempMouseX2 = tempMouseX;
      tempMouseY2 = tempMouseY;
      tempMouseX = this.x;
      tempMouseY = this.y;
      copyLine();


    }
  }


}
