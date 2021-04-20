"use strict";

(function(document, window, index) {
  
  // applying the effect for every form
  var forms = document.querySelectorAll(".wordpress");
  Array.prototype.forEach.call(forms, function(form) {
        
    var input = form.querySelector('input[type="file"]'),
      label = form.querySelector("label"),
      submit = form.querySelector('button[type="button"]'),
      errorMsg = form.querySelector(".box__error span"),
      restart = form.querySelectorAll(".box__restart"),
      clears = form.querySelectorAll("button.clear"),
      progBar = document.querySelector("#uploadProgress"),
      inputBlock = form.querySelector(".form-input"),
      uploadIDOutput = document.querySelector(".box__success .upload__idoutput"),
      uploadIDInput = document.querySelector("#videoworkid"),
      fileOutput = form.querySelector(".file__filename"),
      inputFiles = {},
      verifyFiles = function(e) {
        if (typeof e === 'undefined') {
          fileOutput.textContent = "";
          return false;
        }
        if (e.dataTransfer) { // Are we being passed a (drag and drop) FileList?
          input.value = "";
          inputFiles = e.dataTransfer.files;
        } else {
          inputFiles = input.files;
        }
        // verifyForm();
      },
      // verifyForm = function(e) {
      //   if ((inputFiles.length > 0)) {
      //     submit.disabled = false;
      //   } else {
      //     submit.disabled = true;
      //   }
      // },
      clearInput = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const correspondingInput = e.target
          .closest(".form-input")
          .querySelector("input");
        correspondingInput.value = "";
        inputFiles = {};
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        correspondingInput.dispatchEvent(evt); // Alas, the change event does not trigger when changed programmatically…
      };
    submit.addEventListener("click", uploadToWordpress);
    inputBlock.addEventListener("drop", verifyFiles);
    input.addEventListener("change", verifyFiles);
    clears.forEach(function(elem, currentIndex, listObj) {
      elem.addEventListener("click", clearInput);
    });
    
    async function uploadToWordpress(e) {
      e.preventDefault(); // <-- Probably unnecessary
      form.classList.add("is-uploading");
      form.classList.remove("is-error");

      const fileSize = inputFiles[0].size;
      const fileName = inputFiles[0].name; // Currently unused
      const fileData = inputFiles[0];      

    };

    // restart the form if has a state of error/success
    Array.prototype.forEach.call(restart, function(entry) {
      entry.addEventListener("click", function(e) {
        e.preventDefault();
        form.classList.remove("is-error", "is-success");
        input.value = "";
        form.classList.remove("populated");
        progBar.setAttribute("max", 100);
        progBar.setAttribute("value", 0);
        progBar.innerHTML = "";
        verifyFiles();
      });
    });

    // Firefox focus bug fix for file input
    input.addEventListener("focus", function() {
      input.classList.add("has-focus");
    });
    input.addEventListener("blur", function() {
      input.classList.remove("has-focus");
    });
  });
})(document, window, 0);

