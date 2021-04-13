const formsForm = document.querySelector("form");
const submitButton = document.querySelector("button[type='button']");
submitButton.addEventListener("click", validateAndSubmit);

function validateAndSubmit(e) {

  e.preventDefault();
  const formData = new FormData(formsForm);
  fetch("/form", {
    method: "POST",
    body: formData
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(/**/);
}
