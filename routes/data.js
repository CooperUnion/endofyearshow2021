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


exports.students = async ()=>{
  
  return await fetchCsv('students.csv')  
  
}

exports.faculty = async ()=>{
  const facultyData = await fetchCsv('faculty-and-classes.csv')
  
  let dedupedData = new Set()
  for (let course of facultyData) {
    let faculty = {
      name: course['FIRST NAME'] + ' ' + course['LAST NAME'],
      first: course['FIRST NAME'],
      last: course['LAST NAME']
    }
    
    let facultyString = JSON.stringify(faculty)
    dedupedData.add(facultyString)
  }
   
  return Array.from(dedupedData).map(JSON.parse)
}