import { getYearlyRecord } from  './weather-1.mjs';
import { getMonthlyRecord } from './weather-2.mjs';
import { getBarChartSep } from './weather-3.mjs';
import { getBarChartComb } from './weather-4.mjs';
import { readdir } from 'fs';
import { createInterface } from 'readline';
import { promisify } from 'util';
import { readWeatherFile } from './read-weather.mjs';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });  

const readdirAsync = promisify(readdir);

rl.question('', async (input) => {
    try {
        const cmd = input.split(' ');
        const filePath = cmd[0];
        const files = await readdirAsync(filePath);

        for(let i = 1; i < cmd.length; i+= 2)
        {
            const opt =  cmd[i];
            const date = cmd[i + 1];

            const record = {
                humid: Number.MIN_SAFE_INTEGER,
                highest: Number.MIN_SAFE_INTEGER,
                lowest: Number.MAX_SAFE_INTEGER,

                humidDate: '0000-00-00',
                highestDate: '0000-00-00',
                lowestDate: '0000-00-00',

                values : null,
                attributes : null
            };

            const promises = files.map(async (file) => {
                if (file.includes(date, 0)) {

                    const { values, attributes } = await readWeatherFile({path :`${filePath}\\${file}`});
                    record.values = values;
                    record.attributes = attributes; 

                    if(opt === '-a' || opt === '-e')
                        await getYearlyRecord({record});
                    if(opt === '-b' || opt === '-e')
                        await getMonthlyRecord({record});
                    if(opt === '-c' || opt === '-e')
                        await getBarChartSep({record});
                    if(opt === '-d' || opt === '-e')
                        await getBarChartComb({record});
                }
              });
          
            await Promise.all(promises);

            if(opt === "-e"  || opt === '-a')
            {
                console.log(`
                    Highest humidity: ${record.humid}% on ${record.humidDate}
                    Highest temperature: ${record.highest}°C on ${record.highestDate}
                    Lowest temperature: ${record.lowest}°C on ${record.lowestDate}`);
            }
        }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      rl.close();
    }
});
  