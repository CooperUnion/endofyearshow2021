const fs = require('fs')
const CsvReadableStream = require('csv-reader')


const fetchCsv = async (file)=>{
  
  let stream =  fs.createReadStream(`./.data/${file}`, 'utf8')

  let output = []
  
  return new Promise((resolve, reject)=>{
    stream
      .pipe(new CsvReadableStream({ 
        parseNumbers: true, 
        parseBooleans: true, 
        trim: true,
        asObject: true
      }))
      .on('data', function (row) {
          output.push(row)
      })
      .on('end', function (data) {
          resolve(output)
      });
  })
  
  
}


const students = async ()=>{
  
  let studentData = await fetchCsv('students.csv')
  console.log(studentData)
  
}


 

module.export = 