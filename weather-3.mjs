import { DATE, HIGH_TEMP, LOW_TEMP } from './constants.mjs';

export const getBarChartSep = async ({record}) => {

    try {
        const values = record.values;
        const attributes = record.attributes;
    
        for(let i = 0; i < values.length; i++) {
            const currentDate = values[i].get(attributes[DATE]);
            const hTemp = values[i].get(attributes[HIGH_TEMP]);
            const lTemp = values[i].get(attributes[LOW_TEMP]);

            let hstring = '';
            let lstring = '';

            for(let j = 0; !isNaN(parseInt(hTemp)) && j < parseInt(hTemp); j++)
                hstring += '+';

            for(let j = 0; !isNaN(parseInt(lTemp)) && j < parseInt(lTemp); j++)
                lstring += '*';


            if(currentDate.length > 0)
            {
                console.log(`
                    ${currentDate} ${hstring} ${hTemp} 
                    ${currentDate} ${lstring} ${lTemp}
                    `);
            }
        } 
      } catch (error) {
        throw new Error(error.message);
      }
};


