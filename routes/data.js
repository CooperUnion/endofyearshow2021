const fs = require('fs')
const CsvReadableStream = require('csv-reader')


const fetchCsv = async (file)=>{
  
  let stream =  fs.createReadStream(`./.data/${file}`, 'utf8')

  stream
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
  
}


const students = ()=>{
  
}


 

module.export = {}