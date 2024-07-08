import { createInterface } from 'readline';
import { readFile, readdir } from 'fs';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const readWeatherFile = (filePath, record) => {
    const arr = [];
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
            const currentDate = arr[i].get(headers[0]);


            const hTemp = arr[i].get(headers[1]);
            const lTemp = arr[i].get(headers[3]);
            const hHumid = arr[i].get(headers[7]);

            if(lTemp < record.lowest && lTemp.length > 0) {
                record.lowest = lTemp;
                record.lowestDate = currentDate;

            }

            if(hTemp > record.highest) {
                record.highest = hTemp;
                record.highestDate = currentDate;
            }

            if(hHumid > record.humid) {
                record.humid = hHumid;
                record.humidDate = currentDate;
            }
        }
    });
};

rl.question('', (input) => {
    readdir(input, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }
       
        const record = {
            humid: Number.MIN_SAFE_INTEGER,
            highest: Number.MIN_SAFE_INTEGER,
            lowest: Number.MAX_SAFE_INTEGER,

            humidDate: '0000-00-00',
            highestDate: '0000-00-00',
            lowestDate: '0000-00-00'
        };

        files.forEach(file => {
            if(file.includes("2011", 0)) {
                readWeatherFile(`${input}\\${file}`, record);
            }
        });

        setTimeout(() => {
            console.log(`
            Highest humidity: ${record.humid}% on ${record.humidDate}
            Highest temperature: ${record.highest}°C on ${record.highestDate}
            Lowest temperature: ${record.lowest}°C on ${record.lowestDate}`);
            rl.close();
        }, 1000); 
    });
});
