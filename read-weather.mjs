import { readFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

export const readWeatherFile = async (filePath) => {

  const array = [];
  let headers = [];

  try {
    const data = await readFileAsync(filePath);
    const content = data.toString();
    const lines = content.split('\n');
    headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const obj = new Map();
      for (let j = 0; j < values.length; j++) {
        obj.set(headers[j], values[j]);
      }
      array.push(obj);
    }

    return { array, headers };
  } catch (error) {
    throw new Error(error.message);
  }
};
