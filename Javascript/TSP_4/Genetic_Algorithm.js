function calculateFitness(){
  var currentRecord = Infinity;
  for(let i=0; i<population.length; i++){
    let d = calcDistance(population[i]);
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
    //console.log(orderA,"\n", orderB);
    let order = crossOver(orderA, orderB);
    //console.log(order,"\n");
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
  
  for(let i=0; i<orderB.length; i++){
    let city = orderB[i];
    if(!newOrder.includes(city)){
      newOrder.push(city);
    }
  }
  return newOrder;
}

function mutate(order, mutationRate){
  for(let i=0; i<kmerInp.length; i++){
    let f = 0;
    if(random(1) < mutationRate){
      if(ctr > bestEverSameFor-(floor(0.05*bestEverSameFor))){
        if(k>6){
          for(let kk = 0; kk<k-2; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              console.log("11");
              break;
            }
          }
        }
        else{
          for(let kk = 0; kk<9; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              break;
            }
          }
        }
      }
      if(ctr < bestEverSameFor-(floor(0.05*bestEverSameFor)) && ctr > bestEverSameFor-(floor(0.1*bestEverSameFor))){
        if(k>6){
          for(let kk = 0; kk<k-3; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              console.log("11");
              break;
            }
          }
        }
        else{
          for(let kk = 0; kk<8; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              break;
            }
          }
        }
      }
      if(ctr < bestEverSameFor-(floor(0.1*bestEverSameFor)) && ctr > bestEverSameFor-(floor(0.15*bestEverSameFor))){
        if(k>6){
          for(let kk = 0; kk<k-4; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              console.log("11");
              break;
            }
          }
        }
        else{
          for(let kk = 0; kk<7; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              break;
            }
          }
        }
      }
      if(ctr < bestEverSameFor-(floor(0.15*bestEverSameFor)) && ctr > bestEverSameFor-(floor(0.2*bestEverSameFor))){
        if(k>6){
          for(let kk = 0; kk<k-5; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              console.log("11");
              break;
            }
          }
        }
        else{
          for(let kk = 0; kk<6; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              break;
            }
          }
        }
      }
      if(ctr < bestEverSameFor-(floor(0.2*bestEverSameFor)) && ctr > bestEverSameFor-(floor(0.25*bestEverSameFor))){
        if(k>7){
          for(let kk = 0; kk<k-6; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              console.log("11");
              break;
            }
          }
        }
        else{
          for(let kk = 0; kk<5; kk++){
            let indexA = floor(random(order.length));
            let indexB = (indexA + 1) % kmerInp.length;
            swap(order, indexA, indexB);
            let d = calcDistance(order);
            if(d < recordDistance){
              f = 1;
              break;
            }
          }
        }
      }
      else{
        let indexA = floor(random(order.length));
        let indexB = (indexA + 1) % kmerInp.length;
        swap(order, indexA, indexB);
        let d = calcDistance(order);
        if(d < recordDistance){
          f = 1;
          break;
        }
      }
      if(f ==1){
        return;
      }
    }
  }
}
