function calculateFitness(){
  var currentRecord = Infinity;
  for(let i=0; i<population.length; i++){
    let d = calcDistance(cities, population[i]);
    if(d < recordDistance){
      recordDistance = d;
      bestEver = population[i];
    }
    if(d < currentRecord){
      current = d;
      currentBest = population[i];
    }
    fitness[i] = 1 / (d + 1); 
  }
}

function normalizeFitness(){
  let sum = 0;
  for(let i=0; i<fitness.length; i++){
    sum += fitness[i];
  }
  
  for(let i=0; i<fitness.length; i++){
    fitness[i] += fitness[i] / sum;
  }
}

function nextGeneration(){
  let newPopulation = [];
  for(let i=0; i<population.length; i++){
    let orderA = pickOne(population, fitness);
    let orderB = pickOne(population, fitness);
    let order = crossOver(orderA, orderB);
    mutate(order, 0.01);
    newPopulation[i] = order;
  }
  population = newPopulation;
}

function pickOne(list, prob){
  let index = 0;
  let r = random(1);
  
  while(r > 0){
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(orderA, orderB){
  let start = floor(random(orderA.length));
  let end = floor(random(start + 1, orderA.length));
  let newOrder = orderA.slice(start, end);
  
  //let left = totalCities - newOrder.length;
  for(let i=0; i<orderB.length; i++){
    let city = orderB[i];
    if(!newOrder.includes(city)){
      newOrder.push(city);
    }
  }
  return newOrder;
}

function mutate(order, mutationRate){
  for(let i=0; i<totalCities; i++){
    if(random(1) < mutationRate){
      let indexA = floor(random(order.length));
      let indexB = (indexA + 1) % totalCities;
      if(ctr > besEverSameFor-(floor(0.05*besEverSameFor))){
        for(let kk = 0; kk<3; kk++){
          let indexB = (indexA + 1) % totalCities;
          swap(order, indexA, indexB);
        }
      }
      if(ctr < besEverSameFor-(floor(0.05*besEverSameFor)) && ctr > besEverSameFor-(floor(0.10*besEverSameFor))){
        for(let kk = 0; kk<2; kk++){
          let indexB = (indexA + 1) % totalCities;
          swap(order, indexA, indexB);
        }
      }
      if(ctr < besEverSameFor-(floor(0.1*besEverSameFor)) && ctr > besEverSameFor-(floor(0.15*besEverSameFor))){
        for(let kk = 0; kk<1; kk++){
          let indexB = (indexA + 1) % totalCities;
          swap(order, indexA, indexB);
        }
      }
      swap(order, indexA, indexB);
    }
  }
}
