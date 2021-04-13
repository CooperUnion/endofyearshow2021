const formsForm = document.querySelector("form");
const submitButton = document.querySelector("button[type='button']");
submitButton.addEventListener("click", validateAndSubmit);

let allDroppedFiles = {};

  const allInputs = document.querySelectorAll(".formblock .form-input input");
  allInputs.forEach(function(thisInput, currentIndex) {
    if (thisInput.type === "file") {
      const inputBlock = thisInput.closest(".form-input"), 
            promptClear = inputBlock.querySelector("button.clear"), 
            fileOutput = inputBlock.querySelector(".promptname");

      inputBlock.classList.add("has-advanced-upload"); // letting the CSS part to know drag&drop is supported by the browser
      
      function handleFileOperation(e) {
        if (typeof e === 'undefined') { // Should this ever occur?
          fileOutput.textContent = "";
          return false;
        }
        if (e.dataTransfer) { // Are we being passed a (drag and drop) FileList?
          thisInput.value = "";
          thisInput.submittedFiles = e.dataTransfer.files;
          allDroppedFiles[thisInput.id] = e.dataTransfer.files;
         } else {
          thisInput.submittedFiles = thisInput.files;
        }
        
       fileOutput.textContent = thisInput.submittedFiles.length === 1 ? thisInput.submittedFiles[0].name : thisInput.submittedFiles.length > 1 ? (thisInput.getAttribute("data-multiple-caption") || "").replace("{count}", thisInput.submittedFiles.length) : "";
        updateFileCount();
      }
      
      function updateFileCount() {
        if (thisInput.submittedFiles.length > 0) {
          thisInput.dataset.filecount = thisInput.submittedFiles.length;
          inputBlock.classList.add("populated");
        } else {
          thisInput.dataset.filecount = 0;
          inputBlock.classList.remove("populated");
        }
      }
      
      function clearInput(e) {
        e.preventDefault();
        e.stopPropagation();
        thisInput.value = "";
        delete allDroppedFiles[thisInput.id];
        notifyChange(thisInput); // The input's change event does not fire when changed programmatically
      }
      
      function notifyChange(inputObj) {
        const evt = new Event("change");
        inputObj.dispatchEvent(evt);
      }

      ["drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop"].forEach(function(event) {
        inputBlock.addEventListener(event, function(e) {
          // preventing the unwanted behaviours
          e.preventDefault();
          e.stopPropagation();
        });
      });
      ["dragover", "dragenter"].forEach(function(event) {
        inputBlock.addEventListener(event, function() {
          inputBlock.classList.add("is-dragover");
        });
      });
      ["dragleave", "dragend", "drop"].forEach(function(event) {
        inputBlock.addEventListener(event, function() {
          inputBlock.classList.remove("is-dragover");
        });
      });
      inputBlock.addEventListener("drop", handleFileOperation);

      thisInput.addEventListener("change", handleFileOperation);
      promptClear.addEventListener("click", clearInput);
    }
  });

// function PromiseValidateAndSubmit(e) {
//   e.preventDefault();
//   const formData = new FormData(formsForm);
   
//   fetch("/form", {
//     method: "POST",
//     body: formData
//   })
//     .then(function(response) {
    
//       return response.json()  
//     })
//     .then(function(json){
    
//       console.log(json)
//     })
//     .catch(/**/);
// }

async function validateAndSubmit(e) {
  for (let key in allDroppedFiles) {
    Array.from(allDroppedFiles[key]).forEach(file => { 
      console.log(file);
    });

  }



  e.preventDefault();
  const formData = new FormData(formsForm);
//   const response = await fetch("/form", {
//     method: "POST",
//     body: formData
//   })
  
//   const json = await response.json()
//   console.log(json)
  
//   document.querySelector('code').textContent = JSON.stringify(json, null, "\t")
}
    
