const fs = require('fs')
const CsvReadableStream = require('csv-reader')


const students = ()=>{
  
}

let studentStream =  fs.createReadStream('./.data/students.csv', 'utf8')

studentStream
    .pipe(new CsvReadableStream({ 
      parseNumbers: true, 
      parseBooleans: true, 
      trim: true,
      asObject: true
    }))
    .on('data', function (row) {
        console.log('A row arrived: ', row);
    })
    .on('end', function (data) {
        console.log('No more rows!');
    });
 

module.export = {}