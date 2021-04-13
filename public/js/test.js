const formsBody = document.querySelector(".main");
const formsForm = formsBody.querySelector("form");
const submitButton = document.querySelector("button[type='submit']");
submitButton.addEventListener("click", validateAndSubmit);

function validateAndSubmit(e) {
  console.log(formData);

  e.preventDefault();
  const formData = new FormData(formsForm);
  console.log(formData);
  // fetch("/form", {
  //   method: "POST",
  //   body: formData
  // })
  //   .then(function(response) {
  //     console.log(response);
  //   })
  //   .catch(/**/);
}
