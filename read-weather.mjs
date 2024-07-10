import { readFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

export const readWeatherFile = async (filePath) => {

  const values = [];
  let attributes = [];

  try {
    const data = await readFileAsync(filePath);
    const content = data.toString();
    const lines = content.split('\n');
    attributes = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const entries = lines[i].split(',');
      const obj = new Map();
      for (let j = 0; j < entries.length; j++) {
        obj.set(attributes[j], entries[j]);
      }
      values.push(obj);
    }

    return { values, attributes };
  } catch (error) {
    throw new Error(error.message);
  }
};
