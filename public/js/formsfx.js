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

  
  const submitButton = document.querySelector("button[type='submit']");
  submitButton.addEventListener("click", validateAllInputs);

  const allInputs = document.querySelectorAll(".formblock .form-input input, .formblock .form-input textarea");
  allInputs.forEach(function(thisInput, currentIndex) {
    thisInput.addEventListener("change", validateOneInput);
  });
  

	document.querySelector("fieldset.section-videowork").classList.add("hide");
  document.querySelector("fieldset.section-standardwork").classList.add("hide");
  document.querySelector("fieldset.section-classinfo").classList.add("hide");


  // populateDatalist("/teachers", "datalist-teachers");
  // populateDatalist("/courses", "datalist-classes");
  // populateDatalist("/students", "datalist-collaborators");

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
  
	function forceRadioCheck(e) {
		this.closest(".special").querySelector("input[type='radio']").checked = true;
    validateOneInput(e);
	}
  
	function validateSpecialRadio(e) {
		this.value = this.value.trim();
    if (this.value.length === 0) {
      this.closest(".special").querySelector("input[type='radio']").checked = false;
    }
	}
  

  // function populateDatalist(listURL, listID) {
  //   fetch(listURL)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const theDatalist = document.getElementById(listID);
  //       for (const key in data) {
  //         const option = document.createElement('option');
  //         option.text = data[key].name;
  //         option.value = data[key].name;
  //         theDatalist.appendChild(option);
  //       } 
  //     });
  // }
  
  function validateAllInputs(e) {
    e.preventDefault();
    let invalidFormCount = 0;
    const allActiveInputs = document.querySelectorAll("fieldset:not(.hide) .formblock");
    allActiveInputs.forEach(function(formblock, currentIndex) {
      formblock.classList.remove("invalid");
      if (formblock.dataset.required === "required") {
        const thisInput = formblock.querySelector(".form-input");
        if (!isValid(thisInput)) {
          invalidFormCount += 1;
          formblock.classList.add("invalid");
        }
        if (invalidFormCount > 0) {
          submitButton.classList.add("invalid");
        } else {
          submitButton.classList.remove("invalid");         
        }

      }
    });
  }
 
  function validateOneInput(e) {
    const target = e.target;
    const thisInput = target.closest(".form-input");
    const formblock = thisInput.closest(".formblock");

    if (!isValid(thisInput)) {
      formblock.classList.add("invalid");
    } else {
      formblock.classList.remove("invalid");      
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

