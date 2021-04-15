"use strict";

(function(document, window, index) {
  
  // applying the effect for every form
  var forms = document.querySelectorAll(".box");
  Array.prototype.forEach.call(forms, function(form) {
    var input = form.querySelector('input[type="file"]'),
      email = form.querySelector('input[type="email"]'),
      label = form.querySelector("label"),
      submit = form.querySelector('button[type="submit"]'),
      errorMsg = form.querySelector(".box__error span"),
      restart = form.querySelectorAll(".box__restart"),
      clears = form.querySelectorAll("button.clear"),
      progBar = document.querySelector("#uploadProgress"),
      // uploadAnchor = form.querySelector(".box__success .upload__link"),
      uploadIDOutput = document.querySelector(".box__success .upload__idoutput"),
      fileOutput = form.querySelector(".file__filename"),
      emailOutput = form.querySelector(".email__address"),
      // re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      droppedFiles = false,
      verifyFiles = function(passedEvent) {
        if (typeof passedEvent === 'undefined') {
          input.closest("fieldset").dataset.valid = false;
          fileOutput.textContent = "";
          return false;
        }
        let inputFiles = {};
        if (typeof passedEvent[0] !== 'undefined') { // Are we being passed a FileList?
          input.value = "";
          inputFiles = passedEvent;
        } else {
          droppedFiles = false;
          inputFiles = input.files;
        } // Ensure that there's only ever one designated file for uploading, regardless of input method.
        fileOutput.textContent =
          inputFiles.length === 1
            ? inputFiles[0].name
            : inputFiles.length > 1
            ? (input.getAttribute("data-multiple-caption") || "").replace(
                "{count}",
                inputFiles.length
              )
            : "";
        input.closest("fieldset").dataset.valid =
          inputFiles.length > 0 ? true : false;
        verifyForm();
      },
      // verifyEmail = function() {
      //   emailOutput.textContent = re.test(email.value) ? email.value : "";
      //   email.closest("fieldset").dataset.valid = re.test(email.value)
      //     ? true
      //     : false;
      //   localStorage.setItem('emailaddress', email.value); // Stores the value regardless of verification
      //   verifyForm();
      // },
      verifyForm = function(e) {
        if ((droppedFiles || input.files.length > 0)) {
          form.classList.add("populated");
          submit.disabled = false;
        } else {
          form.classList.remove("populated");
          submit.disabled = true;
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

    input.addEventListener("change", verifyFiles);
    // email.addEventListener("change", verifyEmail);
    clears.forEach(function(elem, currentIndex, listObj) {
      elem.addEventListener("click", clearInput);
    });
    
    // if (localStorage.getItem('emailaddress') != null) {
    //   email.value = localStorage.getItem('emailaddress');
    //   verifyEmail();
    }  

    form.onsubmit = async e => {
      e.preventDefault();
      form.classList.add("is-uploading");
      form.classList.remove("is-error");

      const fileSize = droppedFiles ? droppedFiles[0].size : input.files[0].size;
      const fileName = droppedFiles ? droppedFiles[0].name : input.files[0].name; // Currently unused
      const fileData = droppedFiles ? droppedFiles[0] : input.files[0];      

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

    // restart the form if has a state of error/success
    Array.prototype.forEach.call(restart, function(entry) {
      entry.addEventListener("click", function(e) {
        e.preventDefault();
        form.classList.remove("is-error", "is-success");
        input.value = "";
        droppedFiles = false;
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

