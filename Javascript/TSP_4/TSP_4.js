var cities = [];
var totalCities = 13; 

var stringInp = "ATGCTTCGGGCAAGACTCAAAAATA";
var distances = [];
var kmerDivision;
var k = 6;

function setup() {
  createCanvas(800, 800);
  var order = [];
  for(let i=0; i<totalCities; i++){
    let v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }
  
  kmerDivision = divisionIntoKmers(stringInp);
  
  for(let i=0; i<kmerDivision.length; i++){
    distances.push([]);
  }
  kmerDivision.sort();
  for(let i=0; i<distances.length; i++){
    for(let j=0; j<distances.length; j++){
      str1 = kmerDivision[i].substring(1,k);
      str2 = kmerDivision[j].substring(0,k-1);
      distances[i][j] = hammingDist(str1, str2);
    }
  }
  console.log(stringInp);
  console.log(kmerDivision);
  console.log(distances,k);
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

function swap(a, i, j){
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function hammingDist(str1, str2){
  let hamDist = 0;
  for(let i=0; i<str1.length; i++){
    if(str1[i] != str2[i]){
      hamDist++;
    }
  }
  return hamDist;
}

function divisionIntoKmers(str){
  let inp = [];
  for(let i=0; i<=str.length-k; i++){
    inp.push(str.substring(i,i+k));
  }
  return inp;
}

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
