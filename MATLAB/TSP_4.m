clear all;close all;clc;
cities = [];
totalCities = 20;

population = [];
fitness = [];
populationSize = 1000;

recordDistance = Inf;
ctr = 0;
besEverSameFor = 10000;

function calculateFitness()
    for i=0:lenght(population)
        d = calcDistance(cities, population(i));
        if(d < recordDistance)
            recordDistance = d;
            bestEver = population(i);
        end
        if(d < currentRecord)
            current = d;
            currentEver = population(i);
        end
        fitness(i) = 1/(d+1);
    end
end

function normalizeFitness()
    sum = 0;
    for i=0:length(fitness)
        sum = sum+fitness(i);
    end
    for i=0:length(fitness)
        fitness(i) = fitness(i)+fitness(i)/sum;
    end
end

function nextGeneration()
    newPopulation = [];
    for i=0:length(population)
        orderA = pickOne(population, fitness);
        orderB = pickOne(population, fitness);
        order = crossOver(orderA, orderB);
        mutate(order, 0.01);
        population = newPopulation;
    end
end

function retVar =  pickOne(list, prob)
    index = 0;
    r = randn(1);
    
    while(r>0)
        r = r-prob(index);
        index = index+1;
    end
    index = index -1;
    retVar = slice(list(index));
    disp(retVar);
end

function newOrder = crossOver(orderA, orderB)
    start = floor(randn(length(orderA)));
    ending = floor((start+1)+(length(orderA-(start+1)))*rand(1));
    new
end