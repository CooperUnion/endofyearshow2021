class Client {
  constructor() {

  }
  
  update() {

    }
  
  emit() {

  }
  
}

class Session {
  constructor(){

  }
  
  firstConnect(){

  }
  
  friendNameChange(){

      
}
  
  friendConnect(){
          if(document.getElementById("connections").innerText != document.getElementsByClassName("friend").length){document.getElementById("connections").innerText = document.getElementsByClassName("friend").length
        
      }
  }
  
  friendDisconnect(){
          if(document.getElementById("connections").innerText != document.getElementsByClassName("friend").length){document.getElementById("connections").innerText = document.getElementsByClassName("friend").length
        
      }
  }
  
    
}


export {Client, Session}