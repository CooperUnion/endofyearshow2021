/*jshint esversion: 6 */

const FormFX = function() {

  if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
  if (!Element.prototype.closest) Element.prototype.closest = function(selector) {
    var el = this;
    while (el) {
      if (el.matches(selector)) {
        return el;
      }
      el = el.parentElement;
    }
  };

  if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function(callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

//   const worktypeRadio = document.querySelector("fieldset.section-typeofwork .inputlist.radio");
//   worktypeRadio.addEventListener("click", handleFieldsetVisibility);

//   const specialRadioText = document.querySelector(".special.radio-text input[type='text']");
//   specialRadioText.addEventListener("focus", forceRadioCheck);
//   specialRadioText.addEventListener("blur", validateSpecialRadio);
//   const specialRadioCheckbox = document.querySelector(".special.radio-text input[type='radio']");
//   specialRadioCheckbox.addEventListener("change", focusSpecialText);

  let allDroppedFiles = {};

  // const formsBody = document.querySelector(".main");
  const formsForm = document.querySelector("form");
  const submitButton = document.querySelector("button[type='submit']");
  submitButton.addEventListener("click", validateAndSubmit);

  const allInputs = document.querySelectorAll(".formblock .form-input input, .formblock .form-input textarea");
  allInputs.forEach(function(thisInput, currentIndex) {
    // thisInput.addEventListener("change", validateAllInputs);
    if (thisInput.type === "checkbox") {
      thisInput.addEventListener("change", toggleCheckTag);
    }
    if (thisInput.type === "file") {
      const inputBlock = thisInput.closest(".form-input"), 
            promptClear = inputBlock.querySelector("button.clear"),
            uploadIt = inputBlock.querySelector(".uploadit"),
            promptList = inputBlock.querySelector(".promptlist"),
            summaryOutput = inputBlock.closest(".formblock").querySelector(".filesummary .summary-list");

      inputBlock.classList.add("has-advanced-upload"); // designating the file-select inputs for drag-and-drop decoration
      
      function handleFileOperation(e) {
        if (typeof e === 'undefined') { // Should this ever occur?
          // fileOutput.textContent = "";
          promptList.innerHTML = "";
          return false;
        }
        // let inputFiles = {};
        if (e.dataTransfer) { // Are we being passed a (drag and drop) FileList?
          thisInput.value = "";
          thisInput.submittedFiles = e.dataTransfer.files;
          if (!thisInput.matches('[data-destination="external"]')) { // Excluding the Vimeo uploader file from submission
            allDroppedFiles[thisInput.id] = e.dataTransfer.files;
          }
          // validateAllInputs();
        } else {
          thisInput.submittedFiles = thisInput.files;
        }
        
        uploadIt.textContent = thisInput.submittedFiles.length === 1 ? "Upload it" : "Upload them";
        promptList.innerHTML = `
          ${[...thisInput.submittedFiles].map((item, i) => `
            <dt class="filethumb"><img class="genthumb"></dt>
            <dd class="filemeta" data-required="required"><span class="pseudolabel">Alt text:</span><input type="text" class="alttextfield" placeholder="Description of ${item.name}"></dd>`.trim()).join('')}
        `;
        
        [...thisInput.submittedFiles].forEach(function (file, i) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function() {
            promptList.querySelectorAll("img.genthumb")[i].src = reader.result;
          }
          
          promptList.querySelectorAll(".filemeta")[i].addEventListener("change", validateAltText);
        });
        uploadIt.disabled = true;
        updateFileCount();
      }
      
      function validateAltText() {
        let validCount = true;
        promptList.querySelectorAll(".alttextfield").forEach(function(alttextinput) {
          if (alttextinput.value.length === 0) {
            validCount = false;
          };
        });
        if (validCount) {
          uploadIt.disabled = false;
        } else {
          uploadIt.disabled = true;
        }
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
                  
      async function uploadToWordpress(e) {
        e.preventDefault();
        uploadIt.disabled = true;
        uploadIt.textContent = "Uploading…";
        let formData = new FormData();

        for (let i = 0; i < thisInput.submittedFiles.length; i++) {
          formData.append(thisInput.submittedFiles[i].name, thisInput.submittedFiles[i])
        }

        const response = await fetch("/wp/image", {
          method: "POST",
          body: formData
        }).then(post => post.json())
        document.querySelector("code").innerHTML = JSON.stringify(response, null, "\t");
        resolveFromWordpress(response);
      }
      
      function resolveFromWordpress(response) {
        // promptlist empty
        // remove populated class
        // generate list of files
summaryOutput.textContent =
        
        
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
      uploadIt.addEventListener("click", uploadToWordpress);
      // promptClear.addEventListener("click", clearInput);
    }
  });

  const validationMsg = document.querySelector(".validation-message");

  function scrollToInvalidAnchor() {
    const targetAnchor = this.dataset.anchortarget;
    document.querySelector(`.formblock .titlelabel[data-anchor = "${targetAnchor}"], .formblock .pseudolabel[data-anchor = "${targetAnchor}"]`).scrollIntoView({
      behavior: 'smooth'
    });
  }
  
  function toggleCheckTag(e) {
    const checkTag = this.closest("li");
    if (this.checked) {
      checkTag.classList.add("checked");
    } else {
      checkTag.classList.remove("checked");
    }
  }

  async function validateAndSubmit(e) {
    e.preventDefault();
    console.log(allDroppedFiles);
  }
    

  function isValid(thisInput) {
    let isValid = true;
    switch (thisInput.dataset.inputtype) {
    case "radio":
      const numRadioed = thisInput.querySelectorAll(".inputlist input[type='radio']:checked").length;
      if (numRadioed === 0) {
        isValid = false;
      }
      break;

    case "checkboxes":
      const numChecked = thisInput.querySelectorAll(".inputlist input[type='checkbox']:checked").length;
      if (numChecked === 0) {
        isValid = false;
      }
      break;


    case "textarea":
      const textareaFilled = thisInput.querySelector("textarea").value.length;
      if (textareaFilled === 0) {
        isValid = false;
      }
      break;

    case "file":
        
      const thisInputField = thisInput.querySelector("input[type='file']");
      if (!(thisInputField.id in allDroppedFiles) && thisInputField.files.length === 0) {
        isValid = false;
      }      

      break;


    default:
      const inputFilled = thisInput.querySelector("input").value.length;
      if (inputFilled === 0) {
        isValid = false;
      }
    }
    return isValid;
  }
};

window.addEventListener('DOMContentLoaded', function() {
  new FormFX;
});

