let font;
let baseSize = 800; // Reference size to maintain aspect ratio

function preload() {
  font = loadFont('font/BROADW.TTF');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
}

function draw() {
  background('#000000');
  
  let scaleFactor = min(windowWidth / baseSize, windowHeight / baseSize); // Maintain aspect ratio
  
  push();
  translate(windowWidth / 2, windowHeight / 2); // Center the content
  scale(scaleFactor); // Scale based on the window size while maintaining aspect ratio
  translate(-baseSize / 2, -baseSize / 2); // Move the origin to maintain centering
  
  redHourBox(); // Red hour box
  greenMinuteBox(); // Green minutes box, above the red
  blueSecondBox(); // Blue seconds box, above the green
  clockText12Hour(); // Center time display, top layer
  
  pop();
}

function redHourBox() {
  let h = hour() % 12;
  h = (h === 0) ? 12 : h; // Adjust for 12 AM and 12 PM

  let totalSecondsIn12Hours = 12 * 60 * 60;
  let currentSeconds = (h * 3600) + (minute() * 60) + second();

  let angle = map(currentSeconds, 0, totalSecondsIn12Hours, 0, TWO_PI);

  push();
  translate(baseSize / 2, baseSize / 2); // Correcting the center for the rotating square
  rotate(angle);
  fill('#ff0000');
  stroke('#ff0000');
  strokeWeight(5);
  rectMode(CENTER); // Ensure the square is centered
  rect(0, 0, 200, 200, 25);
  pop();

  // Hours, outside the right edge of the box
  let hourY = map(hour(), 0, 12, 400, 200);
  textSize(95);
  textAlign(CENTER);
  fill('#ff0000');
  noStroke();
  text(nf(h, 2), 720, hourY);
}

function greenMinuteBox() {
  // Green growing square, above the red box
  noFill();
  stroke('#00ff00');
  strokeWeight(20);
  rectMode(CENTER);
  let rSize = map(minute(), 0, 60, 4, 480);
  rect(baseSize / 2, baseSize / 2, rSize, rSize, 25);

  // Minutes, outside the left edge of the box
  let minY = map(minute(), 0, 60, 600, 200);
  textSize(65);
  textAlign(CENTER);
  fill('#00ff00');
  noStroke();
  text(minute(), 100, minY);
}

function blueSecondBox() {
  noFill();
  stroke('#0099ff');
  strokeWeight(5);
  ellipseMode(CENTER);
  let cSize = map(second(), 0, 59, 0, 400);
  circle(baseSize / 2, baseSize / 2, cSize);
  rectMode(CENTER);
  rect(baseSize / 2, baseSize / 2, 400, 400, 25);

  // Seconds, outside the bottom edge of the box
  let secX = map(second(), 0, 60, 200, 600);
  textSize(45);
  textAlign(CENTER);
  fill('#0099ff');
  noStroke();
  text(second(), secX, 705);
}

function clockText12Hour() {
  let h = hour() % 12;
  h = (h === 0) ? 12 : h; // Adjust for 12 AM and 12 PM
  let ampm = (hour() < 12) ? 'AM' : 'PM';

  textSize(85);
  rectMode(CENTER);

  fill(0, 180);
  stroke('#0099ff');
  strokeWeight(3);
  rect(baseSize / 2, 400, 500, 230, 25);

  let hStr = nf(h, 2) + ':';
  let mStr = nf(minute(), 2) + ':';
  let sStr = nf(second(), 2);

  textAlign(LEFT);
  let hw = textWidth(hStr);
  let mw = textWidth(mStr);
  let sw = textWidth(sStr);
  let gap = 20;
  let total = hw + mw + sw + gap * 2;
  let startX = baseSize / 2 - total / 2;

  fill('#ff0000');
  noStroke();
  text(hStr, startX, 390);

  fill('#00ff00');
  noStroke();
  text(mStr, startX + hw + gap, 390);

  fill('#0099ff');
  noStroke();
  text(sStr, startX + hw + gap + mw + gap, 390);

  textAlign(CENTER);
  fill('#ffffff');
  noStroke();
  text(ampm, baseSize / 2, 485);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}