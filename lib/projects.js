const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

class Special {
  constructor(){
    this.adapter = new FileSync('db.json')
    this.db = low(this.adapter)
    this.db.defaults({ projects: []}).write()
  }
  
  get projects() {
    return this.db.get('projects').write()
  }
  
  set project(project) {
    return this.db.get('projects').push(project).write()
  }
  
}

module.exports = new Special()