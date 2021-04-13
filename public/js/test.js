const formsForm = document.querySelector("form");
const submitButton = document.querySelector("button[type='button']");
submitButton.addEventListener("click", validateAndSubmit);

function PromiseValidateAndSubmit(e) {

  e.preventDefault();
  const formData = new FormData(formsForm);
  fetch("/form", {
    method: "POST",
    body: formData
  })
    .then(function(response) {
    
      return response.json()  
    })
    .then(function(json){
    
      console.log(json)
    })
    .catch(/**/);
}

async function validateAndSubmit(e) {

  e.preventDefault();
  const formData = new FormData(formsForm);
  const response = await fetch("/form", {
    method: "POST",
    body: formData
  })
  
  const json = await response.json()
  console.log(json)
  
  document.querySelector('code').innerHTML = JSON.stringify(json)
}
    
