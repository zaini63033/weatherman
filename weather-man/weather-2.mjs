import { createInterface } from 'readline';
import { readFile, readdir } from 'fs';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const readWeatherFile = (filePath) => {
    const arr = [];
    let tempH = 0;
    let tempL = 0;
    let humid = 0;

    readFile(filePath, (err, data) => {
        if (err) throw err;

        const content = data.toString();
        const lines = content.split('\n');
        const headers = lines[0].split(',');

        for(let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const obj = new Map();
            for(let j = 0; j < values.length; j++) {
                obj.set(headers[j], values[j]);
            }
            arr.push(obj);
        }

        for(let i = 0; i < arr.length; i++) {
            const hTemp = parseInt(arr[i].get(headers[1])); 
            const lTemp = parseInt(arr[i].get(headers[3]));
            const hHumid = parseInt(arr[i].get(headers[7]));

            if(!isNaN(hTemp)) tempH += hTemp;
            if(!isNaN(lTemp)) tempL += lTemp;
            if(!isNaN(hHumid)) humid += hHumid;
        }

        tempH /= arr.length;
        tempL /= arr.length;
        humid /= arr.length;

        console.log(`Highest mean humidity: ${humid}"%
            Highest mean temperature: ${tempH}°C
            Lowest mean temperature: ${tempL}"°C`);
    });
};

rl.question('', (input) => {
    readdir(input, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }
       
        files.forEach(file => {
            if(file.includes("2011_Aug", 0)) {
                 readWeatherFile(input + '\\' + file);
            }
        });
    });

    rl.close();
});
