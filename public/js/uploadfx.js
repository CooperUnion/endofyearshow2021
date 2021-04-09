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
  var forms = document.querySelectorAll(".main form .formblock");
  Array.prototype.forEach.call(forms, function(form) {
    var uploadField = form.querySelector('input[type="file"]'),
      clears = form.querySelectorAll("button.clear"),
      progBar = document.querySelector("#uploadProgress"),
      // uploadAnchor = form.querySelector(".box__success .upload__link"),
      uploadIDOutput = document.querySelector(".box__success .upload__idoutput"),
      fileOutput = form.querySelector(".file__filename"),
      re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      droppedFiles = false,
      verifyFiles = function(passedEvent) {
        if (typeof passedEvent === 'undefined') {
          uploadField.closest("fieldset").dataset.valid = false;
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
        } // Ensure that there's only ever one designated file for uploading, regardless of input method.
        fileOutput.textContent = inputFiles.length === 1 ? inputFiles[0].name : inputFiles.length > 1 ? (uploadField.getAttribute("data-multiple-caption") || "").replace("{count}", inputFiles.length): "";
        uploadField.closest("fieldset").dataset.valid = inputFiles.length > 0 ? true : false;
        verifyForm();
      },
      verifyForm = function(e) {
        if (droppedFiles || uploadField.files.length > 0) {
          form.classList.add("populated");
        } else {
          form.classList.remove("populated");
        }
      },
      clearInput = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const correspondingInput = e.target
          .closest("fieldset")
          .querySelector("input");
        correspondingInput.value = "";
        droppedFiles = correspondingInput.files ? false : droppedFiles;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        correspondingInput.dispatchEvent(evt); // Alas, the change event does not trigger when changed programmatically…
      };

    uploadField.addEventListener("change", verifyFiles);
    clears.forEach(function(elem, currentIndex, listObj) {
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

    form.onsubmit = async e => {
      e.preventDefault();
      form.classList.add("is-uploading");
      form.classList.remove("is-error");

      const fileSize = droppedFiles ? droppedFiles[0].size : uploadField.files[0].size;
      const fileName = droppedFiles ? droppedFiles[0].name : uploadField.files[0].name; // Currently unused
      const fileData = droppedFiles ? droppedFiles[0] : uploadField.files[0];      

      console.log({ fileSize, fileData });

      let authResponse = await fetch("/token", {
        method: "GET",
        mode: "no-cors"
      });

      let authResult = await authResponse.json();
      console.log(authResult.token);

      const bearer = "bearer " + authResult.token;

      let uploadRequest = await fetch("https://api.vimeo.com/me/videos", {
        method: "POST",
        body: JSON.stringify({
          upload: {
            approach: "tus",
            size: fileSize,
            redirect_url: window.location.href + "/uploaded"
          },
          privacy: { "view": "unlisted" },
          description: email.value // Passing the e-mail in the description field, for easier identification later
        }),
        headers: {
          Authorization: bearer,
          Accept: "application/vnd.vimeo.*+json;version=3.4",
          "Content-Type": "application/json"
        }
      });

      let uploadResponse = await uploadRequest.json();
      console.log(uploadResponse);

      const uploadLink = uploadResponse.upload.upload_link;
      console.log({ uploadLink });

      const videoID = uploadResponse.uri.split("/")[2];
      console.log({ videoID: videoID });

      var xhr = new XMLHttpRequest();

      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
          progBar.setAttribute("max", e.total);
          progBar.setAttribute("value", e.loaded);
          progBar.innerHTML = Math.floor(e.loaded / e.total) + "%";
        }
      };
      xhr.onloadstart = function(e) {
        console.log("upload initiated");
      };
      xhr.onloadend = function(e) {
        console.log("upload complete");
        changeStateSuccess();
      };

      xhr.open("PATCH", uploadLink);
      xhr.setRequestHeader(
        "Accept",
        "application/vnd.vimeo.*+json;version=3.4"
      );
      xhr.setRequestHeader("Tus-Resumable", "1.0.0");
      xhr.setRequestHeader("Upload-Offset", 0);
      xhr.setRequestHeader("Content-Type", "application/offset+octet-stream");

      xhr.send(fileData);

      let changeStateSuccess = async () => {
        form.classList.remove("is-uploading");
        form.classList.add("is-success");
        uploadIDOutput.value = videoID;
        // uploadAnchor.href = uploadResponse.link;
        // uploadAnchor.textContent = uploadResponse.link.substring(8);

        const tagName = "cooper_union_vimeo_uploader";

        let putRequest = fetch(
          "https://api.vimeo.com/videos/" + videoID + "/tags/" + tagName,
          {
            method: "PUT",
            headers: {
              Authorization: bearer,
              Accept: "application/vnd.vimeo.*+json;version=3.4",
              "Content-Type": "application/vnd.vimeo.tag+json"
            }
          }
        );

        let downloadRequest = await fetch(
          "https://api.vimeo.com/me/videos/" + videoID,
          {
            method: "GET",
            headers: {
              Authorization: bearer,
              Accept: "application/vnd.vimeo.*+json;version=3.4",
              "Content-Type": "application/json"
            }
          }
        );
        let downloadResponse = await downloadRequest.json();
        console.log(downloadResponse);
      };
    };

    // // restart the form if has a state of error/success
    // Array.prototype.forEach.call(restart, function(entry) {
    //   entry.addEventListener("click", function(e) {
    //     e.preventDefault();
    //     form.classList.remove("is-error", "is-success");
    //     uploadField.value = "";
    //     droppedFiles = false;
    //     form.classList.remove("populated");
    //     progBar.setAttribute("max", 100);
    //     progBar.setAttribute("value", 0);
    //     progBar.innerHTML = "";
    //     verifyFiles();
    //   });
    // });

    // Firefox focus bug fix for file input
    uploadField.addEventListener("focus", function() {
      uploadField.classList.add("has-focus");
    });
    uploadField.addEventListener("blur", function() {
      uploadField.classList.remove("has-focus");
    });
  });
})(document, window, 0);

