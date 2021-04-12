/*jshint esversion: 6 */

"use strict";

(function(document, window, index) {
  
  // feature detection for drag&drop upload
  var isAdvancedUpload = (function() {
    var div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();

  // applying the effect for every form
  var formInputBlocks = document.querySelectorAll(".main form .formblock .form-input[data-inputtype='file']");
  Array.prototype.forEach.call(formInputBlocks, function(inputBlock) {
    var inputField = inputBlock.querySelector('input[type="file"]');
//       promptClears = form.querySelectorAll("button.clear"),
//       fileOutput = form.querySelector(".promptname"),
//       // progBar = document.querySelector("#uploadProgress"),
//       // uploadAnchor = form.querySelector(".box__success .upload__link"),
//       // re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
//       droppedFiles = false,
//       handleFileOperation = function(passedEvent) {
//         if (typeof passedEvent === 'undefined') {
//           fileOutput.textContent = "";
//           return false;
//         }
//         let inputFiles = {};
//         if (typeof passedEvent[0] !== 'undefined') { // Are we being passed a FileList?
//           uploadField.value = "";
//           inputFiles = passedEvent;
//         } else {
//           droppedFiles = false;
//           inputFiles = uploadField.files;
//         } 
//         fileOutput.textContent = inputFiles.length === 1 ? inputFiles[0].name : inputFiles.length > 1 ? (uploadField.getAttribute("data-multiple-caption") || "").replace("{count}", inputFiles.length): "";
//         verifyFilesInput();
//       },
//       verifyFilesInput = function(e) {
//         const thisFileInput = form.querySelector("input");
//         if (droppedFiles) {
//           thisFileInput.dataset.filecount = droppedFiles.length;
//           notifyChange(thisFileInput, "dropped");
//           form.classList.add("populated");
//         } else if (uploadField.files.length > 0) {
//           thisFileInput.dataset.filecount = uploadField.files.length;
//           form.classList.add("populated");
//         } else {
//           thisFileInput.dataset.filecount = 0;
//           form.classList.remove("populated");
//         }
//       },
//       clearInput = function(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         const correspondingInput = e.target.closest(".form-input").querySelector("input");
//         correspondingInput.value = "";
//         droppedFiles = correspondingInput.files ? false : droppedFiles;
//         notifyChange(correspondingInput, "change");
//       },
      const notifyChange = function(inputObj) {
        const evt = new CustomEvent("change");
        inputObj.dispatchEvent(evt); // The change event does not trigger when changed programmatically…
        console.log(evt);
      };

//     uploadField.addEventListener("change", handleFileOperation);

//     promptClears.forEach(function(elem, currentIndex, listObj) {
//       elem.addEventListener("click", clearInput);
//     });

    // drag&drop files if the feature is available
    if (isAdvancedUpload) {
      inputBlock.classList.add("has-advanced-upload"); // letting the CSS part to know drag&drop is supported by the browser
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop"
      ].forEach(function(event) {
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
      inputBlock.addEventListener("drop", function(e) {
					notifyChange(inputField);
					// droppedFiles = e.dataTransfer.files; // the files that were dropped
      });
    }

    // Firefox focus bug fix for file input
    inputField.addEventListener("focus", function() {
      inputField.classList.add("has-focus");
    });
    inputField.addEventListener("blur", function() {
      inputField.classList.remove("has-focus");
    });
  });
})(document, window, 0);

