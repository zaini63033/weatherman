import { HIGH_TEMP, LOW_TEMP, HIGH_HUMID } from './constant.mjs';

export const getMonthlyRecord = async (record) => {

    try {
        
        const values = record.val;
        const attrib = record.att;
    
        let tempH = 0;
        let tempL = 0;
        let humid = 0;

        for(let i = 0; i < values.length; i++) {
            const hTemp = parseInt(values[i].get(attrib[HIGH_TEMP])); 
            const lTemp = parseInt(values[i].get(attrib[LOW_TEMP]));
            const hHumid = parseInt(values[i].get(attrib[HIGH_HUMID]));

            if(!isNaN(hTemp)) tempH += hTemp;
            if(!isNaN(lTemp)) tempL += lTemp;
            if(!isNaN(hHumid)) humid += hHumid;
        }

        tempH /= values.length;
        tempL /= values.length;
        humid /= values.length;

        console.log(`
            Highest mean humidity: ${humid}%
            Highest mean temperature: ${tempH}°C
            Lowest mean temperature: ${tempL}°C`);
      } catch (error) {
        throw new Error(error.message);
      }

};

