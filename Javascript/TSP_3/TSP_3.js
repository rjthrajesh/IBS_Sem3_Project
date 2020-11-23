var cities = [];
var totalCities = 12;

var population = [];
var fitness = [];
var populationSize = 1000;

var recordDistance = Infinity;
var bestEver;
var currentBest;
var prevBestEver;
var ctr = 0;
var besEverSameFor = 3000;

var t0;
var t1;

function setup() {
  t0 = performance.now();
  createCanvas(800, 800);
  var order = [];
  for(let i=0; i<totalCities; i++){
    let v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }

  for(let i=0; i<populationSize; i++){
    population[i] = shuffle(order);
  }

}


function draw() {
  background(0);

  calculateFitness();
  normalizeFitness();
  nextGeneration();

  strokeWeight(3);
  noFill();
  for(let i=0; i<cities.length; i++){
    ellipse(cities[i].x, cities[i].y, 10, 10);
  }


  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(let i=0; i<bestEver.length; i++){
    let n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  translate(0,height/2);
  strokeWeight(3);
  noFill();
  for(let i=0; i<cities.length; i++){
    ellipse(cities[i].x, cities[i].y, 10, 10);
  }
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(let i=0; i<currentBest.length; i++){
    let n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();



  if(prevBestEver != bestEver){
    prevBestEver = bestEver;
  }

  if(prevBestEver == bestEver && ctr > besEverSameFor){
    console.log(bestEver);
    console.log("Finished");
    t1 = performance.now();
    console.log("Time taken = "+(t1-t0)/1000+" seconds");
    noLoop();
  }
  else{
    ctr++;
  }
}

//function shuffle(a, num){
//  for(let i=0; i<num; i++){
//    let indexA = floor(random(a.length));
//    let indexB = floor(random(a.length));
//    swap(a, indexA, indexB);
//  }
//}

function swap(a, i, j){
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
// calculating the distance between 2 points
function calcDistance(points, order){
  let sum = 0;
  for(let i=0; i<order.length-1; i++){
    let cityAIndex = order[i];
    let cityA = points[cityAIndex];

    let cityBIndex = order[i+1];
    let cityB = points[cityBIndex];

    let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}
