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
      re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
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
      verifyEmail = function() {
        emailOutput.textContent = re.test(email.value) ? email.value : "";
        email.closest("fieldset").dataset.valid = re.test(email.value)
          ? true
          : false;
        localStorage.setItem('emailaddress', email.value); // Stores the value regardless of verification
        verifyForm();
      },
      verifyForm = function(e) {
        if ((droppedFiles || input.files.length > 0) && re.test(email.value)) {
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
    email.addEventListener("change", verifyEmail);
    clears.forEach(function(elem, currentIndex, listObj) {
      elem.addEventListener("click", clearInput);
    });
    
    if (localStorage.getItem('emailaddress') != null) {
      email.value = localStorage.getItem('emailaddress');
      verifyEmail();
    }  



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

      const fileSize = droppedFiles ? droppedFiles[0].size : input.files[0].size;
      const fileName = droppedFiles ? droppedFiles[0].name : input.files[0].name; // Currently unused
      const fileData = droppedFiles ? droppedFiles[0] : input.files[0];

      
					// const ajaxData = new FormData( form );
					// if( droppedFiles )
					// {
					// 	Array.prototype.forEach.call( droppedFiles, function( file )
					// 	{
					// 		ajaxData.append( input.getAttribute( 'name' ), file );
					// 	});
					// }
      

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

      //use TUS client manually... here
      //https://github.com/tus/tus-js-client

      // const controller = new AbortController();
      // setTimeout(() => controller.abort(), 1500);

      // let postRequest = await fetch("/upload", {
      //   method: "POST",
      //   body: new FormData(form),
      //   approach: "post",
      //   size: fileSize,
      //   redirect_url: window.location.href + "/uploaded"
      // });
      // let postResult = await postRequest.json();
      // console.log(apiResult);

      //             let formRequest = await fetch("https://api.vimeo.com/me/videos", {
      //               method: "POST",
      //               body: JSON.stringify({
      //                 upload: {
      //                   approach: "post",
      //                   size: fileSize,
      //                   redirect_url: window.location.href + "/uploaded"
      //                 }
      //               }),
      //               headers: {
      //                 Authorization: bearer,
      //                 Accept: "application/vnd.vimeo.*+json;version=3.4",
      //                 "Content-Type": "application/json"
      //               }
      //             });

      //             let formResult = await formRequest.json();
      //             console.log(formResult);

      //       let tusUpload = fetch(uploadLink, {
      //         method: "PATCH",
      //         // signal: controller.signal,
      //         headers: {
      //           "Tus-Resumable": "1.0.0",
      //           "Upload-Offset": 0,
      //           "Content-Type": "application/offset+octet-stream",
      //           Accept: "application/vnd.vimeo.*+json;version=3.4"
      //         },
      //         body: fileData
      //       });

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

      //       const checkYourHead = setInterval(async () => {
      //         let headRequest = await fetch(uploadLink, {
      //           method: "HEAD",
      //           headers: {
      //             Accept: "application/vnd.vimeo.*+json;version=3.4",
      //             "Tus-Resumable": "1.0.0"
      //           }
      //         });

      //         console.log({
      //           "upload-length": headRequest.headers.get("Upload-Length"),
      //           "upload-offset": headRequest.headers.get("Upload-Offset"),
      //           "upload-metadata": headRequest.headers.get("Upload-Metadata")
      //       });

      //         if (
      //           headRequest.headers.get("Upload-Length") ===
      //           headRequest.headers.get("Upload-Offset")
      //         ) {
      //           clearInterval(checkYourHead);
      //         }
      //       }, 1000);

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

      // let actualResponse = await actualUpload.json()
      // console.log(actualResponse)

      // fetch('/token', {
      // 	method: 'POST',
      //   mode: 'no-cors',
      // 	body: 'response_type=token&client_id=895d3149b7239db42226ae9c14866ecc55cfae6e&redirect_uri=https%3A%2F%2Fcooper-union-vimeo-uploader.glitch.me&state=' + fileName,
      // 	headers: {
      // 		'Content-Type': 'application/x-www-form-urlencoded'
      // 	}
      // }).then(function (resp) {
      // 	// Return the response as JSON
      //   console.log(resp);
      // 	return resp.json();
      //
      // }).then(function (data) {
      //
      // 	// Log the API data
      // 	console.log(data);
      //
      // }).catch(function (err) {
      //
      // 	// Log any errors
      // 	console.log('something went wrong', err);
      //
      // });
      //     let response = await fetch('https://api.vimeo.com/me/videos', {
      //       method: 'POST',
      //       body: new FormData(form),
      // 			approach: "post",
      // 			size: fileSize,
      // 			redirect_url: window.location.href + "/uploaded"
      //     });
      //     let result = await response.json();
      //     alert(result.message);
    };

    //     if the form was submitted
    //     form.addEventListener('submit', function(e) {
    //       // preventing the duplicate submissions if the current one is in progress
    //       if (form.classList.contains('is-uploading')) return false;
    //
    //
    //       form.classList.add('is-uploading');
    //       form.classList.remove('is-error');
    //
    // //       if (isAdvancedUpload) // ajax file upload for modern browsers
    // //       {
    // //         e.preventDefault();
    // //
    // //         // gathering the form data
    // //         var ajaxData = new FormData(form);
    // //         if (droppedFiles) {
    // //           Array.prototype.forEach.call(droppedFiles, function(file) {
    // //             ajaxData.append(input.getAttribute('name'), file);
    // //           });
    // //         }
    // //
    // //         // ajax request
    // //         var ajax = new XMLHttpRequest();
    // //         ajax.open(form.getAttribute('method'), form.getAttribute('action'), true);
    // //
    // //         ajax.onload = function() {
    // //           form.classList.remove('is-uploading');
    // //           if (ajax.status >= 200 && ajax.status < 400) {
    // //             var data = JSON.parse(ajax.responseText);
    // //             form.classList.add(data.success == true ? 'is-success' : 'is-error');
    // //             if (!data.success) errorMsg.textContent = data.error;
    // //           } else alert('Error. Please, contact the webmaster!');
    // //         };
    // //
    // //         ajax.onerror = function() {
    // //           form.classList.remove('is-uploading');
    // //           alert('Error. Please, try again!');
    // //         };
    // //
    // //         ajax.send(ajaxData);
    // //       } else // fallback Ajax solution upload for older browsers
    // //       {
    // //         var iframeName = 'uploadiframe' + new Date().getTime(),
    // //           iframe = document.createElement('iframe');
    // //
    // //         $iframe = $('<iframe name="' + iframeName + '" style="display: none;"></iframe>');
    // //
    // //         iframe.setAttribute('name', iframeName);
    // //         iframe.style.display = 'none';
    // //
    // //         document.body.appendChild(iframe);
    // //         form.setAttribute('target', iframeName);
    // //
    // //         iframe.addEventListener('load', function() {
    // //           var data = JSON.parse(iframe.contentDocument.body.innerHTML);
    // //           form.classList.remove('is-uploading')
    // //           form.classList.add(data.success == true ? 'is-success' : 'is-error')
    // //           form.removeAttribute('target');
    // //           if (!data.success) errorMsg.textContent = data.error;
    // //           iframe.parentNode.removeChild(iframe);
    // //         });
    // //       }
    //     });

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

