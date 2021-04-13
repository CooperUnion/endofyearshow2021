const formsBody = document.querySelector(".main");
const formsForm = formsBody.querySelector("form");
const submitButton = document.querySelector("button[type='submit']");
submitButton.addEventListener("click", validateAndSubmit);

function validateAndSubmit() {
  const formData = new FormData(formsForm);
  fetch("/form", {
    method: "POST",
    body: formData
    // headers: {
    //   "Content-Type": "application/json"
    // }
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(/**/);
}
