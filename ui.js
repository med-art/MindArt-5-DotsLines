function writeTextUI() {
  textSize(longEdge / 50);
  fill(0);
  noStroke();

  // button1 = createButton('Restart');
  // button1.position((10 * lmax), windowHeight - lmax * 6);
  button2 = createButton('Next');
  button2.position(windowWidth - (10 * lmax) - (lmax * 10), windowHeight - lmax * 6);
  colH2 = color(130, 50, 50);
  colH1 = color(355, 50, 50);

  // button1.style('background-color', colH1);
  // button1.style('font-size', '2.1vmax');
  // button1.style('color', 'white');
  // button1.style('border-radius', '0.5vmax')
  // button1.style('width', '14vmax')
  // button1.mousePressed(restart);

  button2.style('background-color', colH2);
  button2.style('font-size', '2.1vmax');
  button2.style('color', 'white');
  button2.style('border-radius', '0.5vmax')
  button2.style('width', '14vmax')
  button2.mousePressed(nextGrid);

  }

  function writeRestartUI() {


    textSize(longEdge / 50);
    fill(0);
    noStroke();

    button2.remove();
    button2 = createButton('Start Over');
    button2.position(windowWidth - (10 * lmax) - (lmax * 10), windowHeight - lmax * 6);
    colH2 = color(10, 80, 50);
    colH1 = color(355, 50, 50);
    button2.style('background-color', colH2);
    button2.style('font-size', '2.1vmax');
    button2.style('color', 'white');
    button2.style('border-radius', '0.5vmax')
    button2.style('width', '14vmax')
    button2.mousePressed(restart);

    }


  function restart(){
    noiseAmplification = 0;
        stage = 0;
    setup();

  }
