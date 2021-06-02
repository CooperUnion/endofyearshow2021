
class Util {
  constructor (options) {
    this.options = options
  }

  set(body){
    this.reset()

    if(!body) return 
    const classList = body.split(',')

    if(this.options && "body" in this.options) {
      classList = classList.concat(options.body.split(','))
    } 

    document.querySelector("body").classList.add(...classList)
  }

  reset(){
    document.querySelector("body").classList.remove(...document.body.classList)
  }
}

export default {
  install: (app, { options }) => {
    //provide as an injectable socket
    app.provide('header', new Util(options))
  }
}

export { Util }