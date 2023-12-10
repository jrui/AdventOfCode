import { readFileSync } from 'fs';


function normalizeMap(mapString, source, target) {
    const stringArray = mapString.split('\n');
    
    // remove header
    stringArray.shift();
    return stringArray
        .map(row => {
            let values = row.split(' ');
            return {[values[1]]: {
                [`${source}_start`]: parseInt(values[1]),
                [`${source}_end`]: parseInt(values[1]) + parseInt(values[2]),
                [`${target}_start`]: parseInt(values[0]),
                [`${target}_end`]: parseInt(values[0]) + parseInt(values[2]),
                range: parseInt(values[2])
            }};
        })
        .reduce((acc, curr) => {
            return {...acc, ...curr};
        }, {});
}


function findRelationMapping(map, lookup, source, target) {
    const relationMapping = Object.values(map).filter(mapping => {
        return mapping[`${source}_start`] <= lookup && mapping[`${source}_end`] >= lookup;
    }).pop();

    return relationMapping ? {
        ...relationMapping,
        [`${source}`]: parseInt(lookup),
        [`${source}_shift`]: parseInt(lookup) - relationMapping[`${source}_start`]
    } : (source === 'seed'
        || source === 'soil'
        || source === 'fertilizer'
        || source === 'water'
        || source === 'light'
        || source === 'temperature'
        || source === 'humidity') ? {
        [`${source}`]: parseInt(lookup),
        [`${source}_shift`]: 0,
        [`${source}_start`]: parseInt(lookup),
        [`${source}_end`]: parseInt(lookup),
        [`${source}_range`]: 1,
        [`${target}_start`]: parseInt(lookup),
        [`${target}_end`]: parseInt(lookup),
        [`${target}_range`]: 1
    } : {};
}


function run() {
    const blocks = readFileSync('./day05/input/input2.txt', 'utf-8').split('\n\n');
    const [
        seedsString,
        seedToSoilMapString,
        soilToFertilizerMapString,
        fertilizerToWaterMapString,
        waterToLightMapString,
        lightToTemperatureMapString,
        temperatureToHumidityMapString,
        humidityToLocationMapString,
    ] = blocks;

    const seedArray = seedsString.replaceAll(/seeds\:\ /g, '').split(' ').map(seed => parseInt(seed));
    const seedToSoilMap = normalizeMap(seedToSoilMapString, 'seed', 'soil');
    const soilToFertilizerMap = normalizeMap(soilToFertilizerMapString, 'soil', 'fertilizer');
    const fertilizerToWaterMap = normalizeMap(fertilizerToWaterMapString, 'fertilizer', 'water');
    const waterToLightMap = normalizeMap(waterToLightMapString, 'water', 'light');
    const lightToTemperatureMap = normalizeMap(lightToTemperatureMapString, 'light', 'temperature');
    const temperatureToHumidityMap = normalizeMap(temperatureToHumidityMapString, 'temperature', 'humidity');
    const humidityToLocationMap = normalizeMap(humidityToLocationMapString, 'humidity', 'location');
    

    const foundSeedSoilRelation = seedArray
        .map(seed => findRelationMapping(
            seedToSoilMap,
            seed,
            'seed',
            'soil'
        ));    
    const foundSoilFertilizerRelation = foundSeedSoilRelation
        .map(soil => findRelationMapping(
            soilToFertilizerMap,
            soil.soil_start + soil.seed_shift,
            'soil',
            'fertilizer'
        ));
    const foundFertilizerWaterRelation = foundSoilFertilizerRelation
        .map(fertilizer => findRelationMapping(
            fertilizerToWaterMap, 
            fertilizer.fertilizer_start + fertilizer.soil_shift,
            'fertilizer',
            'water'
        ));
    const foundWaterLightRelation = foundFertilizerWaterRelation
        .map(water => findRelationMapping(
            waterToLightMap,
            water.water_start + water.fertilizer_shift,
            'water',
            'light'
        ));
    const foundLightTemperatureRelation = foundWaterLightRelation
        .map(light => findRelationMapping(
            lightToTemperatureMap,
            light.light_start + light.water_shift,
            'light',
            'temperature'
        ));
    const foundTemperatureHumidityRelation = foundLightTemperatureRelation
        .map(temperature => findRelationMapping(
            temperatureToHumidityMap,
            temperature.temperature_start + temperature.light_shift,
            'temperature',
            'humidity'
        ));
    const foundHumidityLocationRelation = foundTemperatureHumidityRelation
        .map(humidity => findRelationMapping(
            humidityToLocationMap,
            humidity.humidity_start + humidity.temperature_shift,
            'humidity',
            'location'
        ));

    const altitude = foundHumidityLocationRelation.map(relation => {
        return relation.location_start += relation.humidity_shift;
    });

    return Math.min(... altitude);
}

export default run;
