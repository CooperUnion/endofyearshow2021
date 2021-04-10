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

  const worktypeRadio = document.querySelector("fieldset.section-typeofwork .inputlist.radio");
  worktypeRadio.addEventListener("click", handleFieldsetVisibility);
  
  const specialRadioText = document.querySelector(".special.radio-text input[type='text']");
  specialRadioText.addEventListener("focus", forceRadioCheck);
  specialRadioText.addEventListener("blur", validateSpecialRadio);

  const specialRadioCheckbox = document.querySelector(".special.radio-text input[type='radio']");
  specialRadioCheckbox.addEventListener("change", focusSpecialText);

  const formsBody = document.querySelector(".main");  
  const formsForm = formsBody.querySelector("form");  
  const submitButton = document.querySelector("button[type='submit']");
  submitButton.addEventListener("click", validateAndSubmit);

  const allInputs = document.querySelectorAll(".formblock .form-input input, .formblock .form-input textarea");
  allInputs.forEach(function(thisInput, currentIndex) {
    thisInput.addEventListener("change", validateAllInputs);
  });
  
  const validationMsg = document.querySelector(".validation-message");

	document.querySelector("fieldset.section-videowork").classList.add("hide");
  document.querySelector("fieldset.section-standardwork").classList.add("hide");
  document.querySelector("fieldset.section-classinfo").classList.add("hide");

  function handleFieldsetVisibility() {
    const workTypeChecked = worktypeRadio.querySelector("input:checked");
    
    if (workTypeChecked === null) {
      return false;
    }

    switch (workTypeChecked.value) {
    case "video":
      document.querySelector("fieldset.section-standardwork").classList.add("hide");
      document.querySelector("fieldset.section-videowork").classList.remove("hide");
      break;

    default:
      document.querySelector("fieldset.section-standardwork").classList.remove("hide");
      document.querySelector("fieldset.section-videowork").classList.add("hide");
    }
    
    document.querySelector("fieldset.section-classinfo").classList.remove("hide");
  }
  
	function forceRadioCheck() {
		this.closest(".special").querySelector("input[type='radio']").checked = true;
    validateAllInputs();
	}
  
	function focusSpecialText() {
		if (this.closest(".special").querySelector("input[type='radio']").checked) {
      this.closest(".special").querySelector("input[type='text']").focus();
    }
	}
  
	function validateSpecialRadio() {
		this.value = this.value.trim();
    if (this.value.length === 0) {
      this.closest(".special").querySelector("input[type='radio']").checked = false;
    }
	}
    
  function validateAllInputs() {
    let invalidForms = [];
    const allActiveInputs = document.querySelectorAll("fieldset:not(.hide) .formblock");
    allActiveInputs.forEach(function(formblock, currentIndex) {
      formblock.classList.remove("invalid");
      if (formblock.dataset.required === "required") {
        const thisInput = formblock.querySelector(".form-input");
        if (!isValid(thisInput)) {
          invalidForms.push(formblock.querySelector(".titlelabel, .pseudolabel"));
          formblock.classList.add("invalid");
        }
      }
    });
    validationMsg.innerHTML = "";
    if (invalidForms.length > 0) {
      const newList = document.createElement("ul");
      for (const invalidForm of invalidForms) {
        const newListItem = document.createElement("li");
        newListItem.textContent = invalidForm.textContent;
        newListItem.dataset.anchortarget = invalidForm.dataset.anchor;
        newListItem.addEventListener("click", scrollToInvalidAnchor);
        newList.appendChild(newListItem);
      }
      validationMsg.appendChild(newList);
      const msg = invalidForms.length === 1 ? "'The following field is required: ''" : "'The following fields are required: ''";
      document.documentElement.style.setProperty("--reqmsg", msg);
      return false;
    } else {
      return true;
    }
  }
   
  function scrollToInvalidAnchor() {
    const targetAnchor = this.dataset.anchortarget;
    document.querySelector(`.formblock .titlelabel[data-anchor="${targetAnchor}"], .formblock .pseudolabel[data-anchor="${targetAnchor}"]`).scrollIntoView({ behavior: 'smooth'});
  }

  function validateAndSubmit(e) {
    e.preventDefault();
    if (validateAllInputs()) {
      formsBody.classList.remove("validation-active");
      
      const formData = new FormData(formsForm);
      // const entries = formData.entries();
      // const data = Object.fromEntries(entries);
      // console.log(JSON.stringify(data));
      fetch("/form", {
        method: "POST",
        body: formData
        // headers: {
        //   "Content-Type": "application/json"
        // }
      }).then(function (response) {
        console.log(response);
      }).catch(/**/);
    } else {
      formsBody.classList.add("validation-active");     
    }
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
      const filesAdded = thisInput.querySelector("input").files.length;
        console.log(filesAdded);
        if (filesAdded === 0) {
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

