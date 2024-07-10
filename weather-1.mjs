import { DATE, HIGH_TEMP, LOW_TEMP, HIGH_HUMID } from './constants.mjs';

export const getYearlyRecord = async ({record}) => {
  try {
    const values = record.values;
    const attributes = record.attributes;

    for (let i = 0; i < values.length; i++) {
      const currentDate = values[i].get(attributes[DATE]);
      const hTemp = values[i].get(attributes[HIGH_TEMP]);
      const lTemp = values[i].get(attributes[LOW_TEMP]);
      const hHumid = values[i].get(attributes[HIGH_HUMID]);

      if (lTemp < record.lowest && lTemp.length > 0) {
        record.lowest = lTemp;
        record.lowestDate = currentDate;
      }
      if (hTemp > record.highest) {
        record.highest = hTemp;
        record.highestDate = currentDate;
      }
      if (hHumid > record.humid) {
        record.humid = hHumid;
        record.humidDate = currentDate;
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
