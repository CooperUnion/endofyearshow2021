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
  var forms = document.querySelectorAll(".main form .formblock .form-input[data-inputtype='file']");
  Array.prototype.forEach.call(forms, function(form) {
    var uploadField = form.querySelector('input[type="file"]'),
      promptClears = form.querySelectorAll("button.clear"),
      fileOutput = form.querySelector(".promptname"),
      // progBar = document.querySelector("#uploadProgress"),
      // uploadAnchor = form.querySelector(".box__success .upload__link"),
      // re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      droppedFiles = false,
      verifyFiles = function(passedEvent) {
        if (typeof passedEvent === 'undefined') {
          fileOutput.textContent = "";
          return false;
        }
        let inputFiles = {};
        if (typeof passedEvent[0] !== 'undefined') { // Are we being passed a FileList?
          uploadField.value = "";
          inputFiles = passedEvent;
        } else {
          droppedFiles = false;
          inputFiles = uploadField.files;
        } 
        fileOutput.textContent = inputFiles.length === 1 ? inputFiles[0].name : inputFiles.length > 1 ? (uploadField.getAttribute("data-multiple-caption") || "").replace("{count}", inputFiles.length): "";
        verifyFilesInput();
      },
      verifyFilesInput = function(e) {
        const thisFileInput = form.querySelector("input");
        if (droppedFiles) {
          thisFileInput.dataset.filecount = droppedFiles.length;
          notifyChange(thisFileInput, "drop");
          form.classList.add("populated");
        } else if (uploadField.files.length > 0) {
          thisFileInput.dataset.filecount = uploadField.files.length;
          form.classList.add("populated");
        } else {
          thisFileInput.dataset.filecount = 0;
          form.classList.remove("populated");
        }
      },
      clearInput = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const correspondingInput = e.target.closest(".form-input").querySelector("input");
        correspondingInput.value = "";
        droppedFiles = correspondingInput.files ? false : droppedFiles;
        notifyChange(correspondingInput, "change");
      },
      notifyChange = function(inputObj, evtType) {
        // var evt = document.createEvent("HTMLEvents");
         // evt.initEvent(evtType, true, true, true);
        const evt = new Event(evtType);
        inputObj.dispatchEvent(evt); // The change event does not trigger when changed programmatically…
        console.log(inputObj);
      };

    uploadField.addEventListener("change", verifyFiles);
    uploadField.addEventListener("drop", function() { alert("Hey") });

    promptClears.forEach(function(elem, currentIndex, listObj) {
      elem.addEventListener("click", clearInput);
    });

    // drag&drop files if the feature is available
    if (isAdvancedUpload) {
      form.classList.add("has-advanced-upload"); // letting the CSS part to know drag&drop is supported by the browser
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop"
      ].forEach(function(event) {
        form.addEventListener(event, function(e) {
          // preventing the unwanted behaviours
          e.preventDefault();
          e.stopPropagation();
        });
      });
      ["dragover", "dragenter"].forEach(function(event) {
        form.addEventListener(event, function() {
          form.classList.add("is-dragover");
        });
      });
      ["dragleave", "dragend", "drop"].forEach(function(event) {
        form.addEventListener(event, function() {
          form.classList.remove("is-dragover");
        });
      });
      form.addEventListener("drop", function(e) {
					droppedFiles = e.dataTransfer.files; // the files that were dropped
					verifyFiles(droppedFiles);
      });
    }

    // Firefox focus bug fix for file input
    uploadField.addEventListener("focus", function() {
      uploadField.classList.add("has-focus");
    });
    uploadField.addEventListener("blur", function() {
      uploadField.classList.remove("has-focus");
    });
  });
})(document, window, 0);

