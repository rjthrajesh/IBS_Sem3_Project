var stringInp = "ATGCTTCGGGCAAGACTCAAAAATA";
var k = 10;
var stepLen = 4;
var strOut;
var newKmerDecomp = [];

var distances = [];
var kmerInp;
var order = [];
var ctr = 0;
var iterVal = 10000;

var populationSize = 1000;
var fitness = [];
var population = [];

var recordDistance = Infinity;
var bestEver;
var bestEverSameFor = 10000;
var prevBestEver = [];


function setup() {
  kmerInp = divisionIntoKmers(stringInp);
  
  for(let i=0; i<kmerInp.length; i++){
    distances.push([]);
  }
  
  kmerInp.sort();
  
  for(let i=0; i<distances.length; i++){
    for(let j=0; j<distances.length; j++){
      str1 = kmerInp[i].substring(1,k);
      str2 = kmerInp[j].substring(0,k-1);
      distances[i][j] = hammingDist(str1, str2);
    }
    order[i] = i;
  }
  
  for(let i=0; i<populationSize; i++){
    population[i] = shuffle(order);
  }
}


function draw() {

  calculateFitness();
  normalizeFitness();
  nextGeneration();
  console.log(1);

  if(prevBestEver != bestEver){
    console.log(prevBestEver);
    console.log(calcDistance(prevBestEver));
    prevBestEver = bestEver;
    console.log(2);
    console.log(prevBestEver);
    console.log(calcDistance(prevBestEver));
    console.log("\n");
  }

  if(prevBestEver == bestEver && ctr > bestEverSameFor){
    console.log(bestEver);
    console.log(floor(calcDistance(bestEver)/k));
    console.log(calcDistance(bestEver));
    for(let i=0; i<bestEver.length; i++){
      newKmerDecomp.push(kmerInp[bestEver[i]]);
    }
    console.log(newKmerDecomp);
    for(let i=0; i<newKmerDecomp.length; i++){
      if(i ==0){
        strOut = newKmerDecomp[i];
      }
      else{
        abcs = newKmerDecomp[i].substring(k-stepLen,k);
        strOut = strOut + abcs;
      }
    }
    console.log(strOut);
    console.log(hammingDist(strOut, stringInp));
    noLoop();
  }
  else{
    ctr++;
  }
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
  for(let i=0; i<=str.length-k; i+=stepLen){
    inp.push(str.substring(i,i+k));
  }
  return inp;
}

function calcDistance(order){
  let sum = 0;
  for(let i=0; i<order.length-1; i++){
    sum += distances[order[i]][order[i+1]];
  }
  return sum;
}
