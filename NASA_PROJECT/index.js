import { parse } from 'csv-parse';
import fs from "fs";

const habitablePlanets = [];
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED';
}

fs.createReadStream("kepler_data.csv")
  .pipe(parse({
    comment:"#",
    columns: true
  }))
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
        habitablePlanets.push(data);
    }
  })
  .on('end', () => {
    console.log(habitablePlanets);
    console.log('done');
  })
  .on('error', (err) => {
    console.error('Error during parsing:', err);
  });
