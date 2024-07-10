import { DATE, HIGH_TEMP, LOW_TEMP } from './attrib.mjs';


export const getBarChartComb = async (record) => {
   
    try {
        const values = record.val;
        const attrib = record.att;
    
        for(let i = 0; i < values.length; i++) {
            const currentDate = values[i].get(attrib[DATE]);
            const hTemp = values[i].get(attrib[HIGH_TEMP]);
            const lTemp = values[i].get(attrib[LOW_TEMP]);
            let hstring = '';
            let lstring = '';
            for(let j = 0; !isNaN(parseInt(hTemp)) && j < parseInt(hTemp); j++)
                hstring += '+';
            for(let j = 0; !isNaN(parseInt(lTemp)) && j < parseInt(lTemp); j++) 
                lstring += '*';
            
            if(currentDate.length > 0)
            console.log(`${currentDate} ${hstring}${lstring} ${lTemp}-${hTemp}`);
           
        }
       
      } catch (error) {
        throw new Error(error.message);
      }

};

