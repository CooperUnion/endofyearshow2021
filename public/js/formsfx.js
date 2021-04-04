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
  
	document.querySelector("fieldset.section-videowork").classList.add("hide");
  document.querySelector("fieldset.section-standardwork").classList.add("hide");
  document.querySelector("fieldset.section-classinfo").classList.add("hide");


  populateDatalist("/teachers", "datalist-teachers");
  populateDatalist("/courses", "datalist-classes");
  populateDatalist("/students", "datalist-collaborators");

  function handleFieldsetVisibility() {
    const workTypeChecked = worktypeRadio.querySelector("input:checked");
    const typeOfWork = workTypeChecked === null ? "not selected" : workTypeChecked.value;

    switch (typeOfWork) {
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
	}
  
  function populateDatalist(listURL, listID) {
    fetch(listURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const theDatalist = document.getElementById(listID);
        for (const key in data) {
          option = document.createElement('option');
          option.text = data[key].name;
          option.value = data[key].name;
          theDatalist.appendChild(option);
        } 
      });
  }
  
  function validateInputs() {
    const allActiveInputs = document.querySelectorAll("fieldset:not(.hide) .formblock");
    allActiveInputs.forEach(function(formblock, currentIndex) {
      if (formblock.dataset.required === "required") {
        const thisInput = formblock.querySelector(".form-input");
      }
    });
  }
  
  validateInputs();
};

window.addEventListener('DOMContentLoaded', function() {
  new FormFX;
});

