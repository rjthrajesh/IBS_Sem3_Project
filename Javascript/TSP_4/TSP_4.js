var cities = [];
var totalCities = 100; 

function setup() {
  createCanvas(800, 800);
  var order = [];
  for(let i=0; i<totalCities; i++){
    let v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }
}


function draw() {
  background(0);
  strokeWeight(3);
  noFill();
  for(let i=0; i<cities.length; i++){
    ellipse(cities[i].x, cities[i].y, 10, 10);
  }
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(let i=0; i<cities.length; i++){
    vertex(cities[i].x, cities[i].y);
  }
  endShape();
}
