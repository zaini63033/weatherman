const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function readWeatherFile(file_path)
{
    let arr = new Array();
    fs.readFile(file_path, (err, data) => {
        if (err) throw err;
       
        content = data.toString();
        var lin = content.split('\n');
        var att = lin[0].split(',');

        for(let i = 1; i < lin.length; i++)
            {
                var val = lin[i].split(',');
                let obj = new Map();
                for(j = 0; j < val.length; j++)
                    {
                        obj.set(att[j], val[j])
                    }
                arr.push(obj)
            }

        
        
        for(let i = 0; i < arr.length; i++)
            {
                console.log(arr[i].get(att[0]));
            }

      });
}

rl.question('', (input) => {
    readWeatherFile(input);
	rl.close();
});


 