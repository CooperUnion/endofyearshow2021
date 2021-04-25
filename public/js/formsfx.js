/*jshint esversion: 8 */
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

	const specialRadioText = document.querySelector(".special.radio-text input[type='text']");
	specialRadioText.addEventListener("focus", forceRadioCheck);
	specialRadioText.addEventListener("blur", validateSpecialRadio);
	const specialRadioCheckbox = document.querySelector(".special.radio-text input[type='radio']");
	specialRadioCheckbox.addEventListener("change", focusSpecialText);

	const formsBody = document.querySelector(".main");
	const formsForm = formsBody.querySelector("form");
  
	const submitButton = document.querySelector("button[type='submit']");
	submitButton.addEventListener("click", validateAndSubmit);
  
  const reqRads = document.querySelectorAll("[data-reqrad]");

	const allInputs = document.querySelectorAll(".formblock .form-input input, .formblock .form-input textarea");
	allInputs.forEach(function(thisInput) {
        
    const inputType = thisInput.list ? "datalist" : thisInput.type;

    switch (inputType) {
			case "radio":
        thisInput.addEventListener("change", handleReqRads);
        break;

			case "checkbox":
        thisInput.addEventListener("change", toggleCheckTag);
        break;

      case "datalist":
        thisInput.addEventListener("change", handleDatalist);
        break;

      case "file": {

        const inputBlock = thisInput.closest(".form-input"),
          // promptClear = inputBlock.querySelector("button.clear"),
          clearAll = inputBlock.querySelector(".clearall"),
          uploadIt = inputBlock.querySelector(".uploadit"),
          promptList = inputBlock.querySelector(".promptlist"),
          summaryInput = inputBlock.closest(".formblock").querySelector(":scope > .form-input");   

        inputBlock.classList.add("has-advanced-upload"); // designating the file-select inputs for drag-and-drop decoration

        inputBlock.addEventListener("drop", handleFileOperation);
        thisInput.addEventListener("change", handleFileOperation);
        uploadIt.addEventListener("click", uploadToExternalService);
        clearAll.addEventListener("click", clearFileInputSelections);

        ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach(function(event) {
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
            validateAllInputs();
          } else {
            thisInput.submittedFiles = thisInput.files;
          }
          inputBlock.classList.remove("success");
          clearAll.disabled = thisInput.submittedFiles.length > 0 ? false : true;
          uploadIt.textContent = thisInput.submittedFiles.length === 1 ? "Upload it" : "Upload them";
          promptList.innerHTML = `
            ${[...thisInput.submittedFiles].map((item, i) => `
              <dt class="filethumb"><img class="genthumb" src=""></dt>
              <dd class="filemeta" data-required="required"><span class="pseudolabel">Alt text:</span><input type="text" class="alttextfield" placeholder="Please provide a description of ${item.name}"></dd>`.trim()).join('')}
          `;

          [...thisInput.submittedFiles].forEach(function(file, i) {
            promptList.querySelectorAll(".filemeta")[i].addEventListener("input", validateAltText);          
            (async function() {
              const generatedThumbSrc = await getThumbSrc(file);
              promptList.querySelectorAll("img.genthumb")[i].src = generatedThumbSrc;
            })();
          });
          uploadIt.disabled = true;
          if (thisInput.submittedFiles.length > 0) {
            inputBlock.classList.add("populated");
            inputBlock.querySelector(".success-message small").textContent = "Your " + (thisInput.submittedFiles.length === 1 ? "file has" : "files have") + " been submitted.";
          }
        }

        function validateAltText() {
          let validCount = true;
          promptList.querySelectorAll(".alttextfield").forEach(function(alttextinput) {
            if (alttextinput.value.length === 0) {
              validCount = false;
            }
          });
          if (validCount) {
            uploadIt.disabled = false;
          } else {
            uploadIt.disabled = true;
          }
        }

        function getThumbSrc(file, seekTo = 5.0) {
          return new Promise((resolve, reject) => {
            var fileReader = new FileReader();
            if (file.type.match('image')) {
              fileReader.onload = function() {
                resolve(fileReader.result);
              };
              fileReader.readAsDataURL(file);
            } else {
              fileReader.onload = function() {
                // load the file to a video player
                const videoPlayer = document.createElement('video');
                videoPlayer.setAttribute('src', URL.createObjectURL(file));
                videoPlayer.load();
                videoPlayer.addEventListener('error', (ex) => {
                    reject("error when loading video file", ex);
                });
                // load metadata of the video to get video duration and dimensions
                videoPlayer.addEventListener('loadedmetadata', () => {
                    // seek to user defined timestamp (in seconds) if possible
                    if (videoPlayer.duration < seekTo) {
                        seekTo = 0.0;
                    }
                    // delay seeking or else 'seeked' event won't fire on Safari
                    setTimeout(() => {
                      videoPlayer.currentTime = seekTo;
                    }, 200);
                    // extract video thumbnail once seeking is complete
                    videoPlayer.addEventListener('seeked', () => {
                        // define a canvas to have the same dimension as the video
                        const canvas = document.createElement("canvas");
                        canvas.width = videoPlayer.videoWidth;
                        canvas.height = videoPlayer.videoHeight;
                        // draw the video frame to canvas
                        canvas.getContext("2d").drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                        var imgData = canvas.toDataURL();
                        resolve(imgData);
                    });
                  });
              };
              fileReader.readAsArrayBuffer(file);
            }            
          });
        }

        function uploadToExternalService(e) {
          e.preventDefault();

          clearAll.disabled = true;
          uploadIt.disabled = true;
          uploadIt.textContent = "Uploading…";
          inputBlock.classList.add("uploading");
          promptList.querySelectorAll(".alttextfield").forEach(function(textfield) {
            textfield.readOnly = true;
          });

          const upServ = this.closest("[data-uploadservice]").dataset.uploadservice;
          if (upServ === "wordpress") {
            uploadToWordpress();
          } else if (upServ === "vimeo") {
            uploadToVimeo();
          }
        }

        function clearFileInputSelections() {
          promptList.innerHTML = "";
          inputBlock.classList.remove("uploading");
          // thisInput.dataset.filecount = 0;
          inputBlock.classList.remove("populated");
          thisInput.submittedFiles = {};
          thisInput.value = "";
        }  

        async function uploadToWordpress() {
          let formData = new FormData();

          let alttext = [];
          for (let i = 0; i < thisInput.submittedFiles.length; i++) {
            formData.append(thisInput.submittedFiles[i].name, thisInput.submittedFiles[i]);
            alttext.push(promptList.querySelectorAll(".alttextfield")[i].value);
          }
          formData.append("alt_text", JSON.stringify(alttext));

          const response = await fetch("/wp/imageArray", {
            method: "POST",
            body: formData
          }).then(post => post.json());
          resolveFromWordpress(response);
        }

        function resolveFromWordpress(response) {
          clearFileInputSelections();
          inputBlock.classList.add("success");
          summaryInput.querySelector(".summary-list").innerHTML = `
            <ul class="response-files">
              ${response.map(metadata => `
                <li class="response-file" data-id="${metadata.id}" data-thumb="${metadata.thumbnail.source_url}">${metadata.originalname}</li>
            `).join("\n")}
            </ul>
          `;
          summaryInput.classList.add("generated");
          summaryInput.querySelector("input[type='hidden']").value = JSON.stringify(response.map(item => item.id));
          validateAllInputs();
        }

        async function uploadToVimeo(e) {

          const email = inputBlock.closest(".uploader").querySelector('input.vimeoemail'),
                progBar = document.querySelector(".uploadProgress"),
                fileSize = thisInput.submittedFiles[0].size,
                fileName = thisInput.submittedFiles[0].name, // Currently unused
                fileData = thisInput.submittedFiles[0];      

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
            clearFileInputSelections();

            inputBlock.classList.add("success");
            summaryInput.querySelector(".summary-list").innerHTML = `
              <ul class="response-files">
                  <li class="response-file" data-id="${videoID}" data-link="${uploadResponse.link}">${uploadResponse.name}</li>
              </ul>
            `;
            summaryInput.classList.add("generated");
            summaryInput.querySelector("input[type='hidden']").value = "[" + videoID + "]"; // Array-like string, to match the Wordpress implementation
            validateAllInputs();

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
        }
      }
        
        break;

			default:
        thisInput.addEventListener("change", validateAllInputs);
    }

	});

	const validationMsg = document.querySelector(".validation-message");

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
		const allActiveInputs = document.querySelectorAll("fieldset:not([data-reqrad]) .formblock, fieldset.radio-show .formblock");
    const filteredActiveInputs = [...allActiveInputs].filter(node => !node.matches("[data-reqrad]:not(.radio-show)"));
		filteredActiveInputs.forEach(function(formblock) {
			formblock.classList.remove("invalid");
			if (formblock.dataset.required === "required") {
				const thisInput = formblock.querySelector(".form-input:not(.no-validate)");
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
			formsBody.classList.remove("validation-active");
			return true;
		}
	}

	function scrollToInvalidAnchor() {
		const targetAnchor = this.dataset.anchortarget;
		document.querySelector(`.formblock .titlelabel[data-anchor = "${targetAnchor}"], .formblock .pseudolabel[data-anchor = "${targetAnchor}"]`).scrollIntoView({
			behavior: 'smooth'
		});
	}

	function toggleCheckTag() {
		const checkTag = this.closest("li");
		if (this.checked) {
			checkTag.classList.add("checked");
		} else {
			checkTag.classList.remove("checked");
		}
    validateAllInputs();
	}

	function handleReqRads() {
    reqRads.forEach(function(reqElem) {
      const idsArray = reqElem.dataset.reqrad.split(",").map(str => str.trim());
      let isMatch = false;
      idsArray.forEach(function(radioID){
        isMatch = document.getElementById(radioID).checked ? true : isMatch;
      });
      if (isMatch) {
        reqElem.classList.add("radio-show");
      } else {
        reqElem.classList.remove("radio-show");
      }
    });
    validateAllInputs();
  }

  function handleDatalist() {
    const checkList = this.closest(".formblock").querySelector(".inputlist.checkboxes");
    const listValue = this.value;
    if ([...this.list.options].map(option => option.value).includes(listValue)) {
      checkList.querySelectorAll("li").forEach(function(thisLi) {
        if (thisLi.querySelector("input").value === listValue) {
          checkList.removeChild(thisLi);
        }
      });
      const newLi = document.createElement("li");
      newLi.classList.add("checked");
      newLi.innerHTML = `<label><input type="checkbox" name="${checkList.dataset.name}" value="${listValue}" checked="checked">${listValue}</label>`;
      newLi.addEventListener("change", removeLi);
      checkList.appendChild(newLi);
      this.value = "";
      validateAllInputs();
    }
    function removeLi() {
      checkList.removeChild(this);
      validateAllInputs();
    }
  }

	async function validateAndSubmit(e) {
		e.preventDefault();

		if (validateAllInputs()) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting…";
      
      const hiddenBlocks = formsForm.querySelectorAll("[data-reqrad]:not(.radio-show)");
      hiddenBlocks.forEach(function(hiddenBlock){
        if (hiddenBlock.matches("fieldset")) {
          hiddenBlock.disabled = true;
        } else {
          const childInputs = hiddenBlock.querySelectorAll("input, textarea");
          childInputs.forEach(function(childInput){
            childInput.disabled = true;
          });
        }
      });
            
			const formData = new FormData(formsForm);
			const response = await fetch("/wp/formData", {
				method: "POST",
				body: formData
			});
			const json = await response.json();
			handleSubmissionResponse(json);
		} else {
			formsBody.classList.add("validation-active");
		}
	}

  function handleSubmissionResponse(json) {
    console.log(json);
    formsForm.style.display = "none";
    const successMsg = document.createElement('h5');
    successMsg.innerHTML = `Your form has been submitted. If you need to submit additional items, please <a href="${window.location}">fill out this form again.</a>.`;
    document.querySelector("footer").appendChild(successMsg);
    const resultsLink = document.createElement('h6');
    resultsLink.innerHTML = `You can view the results of your submission <a href="https://eoys-uploader-2021.glitch.me/app/post/${json.id}">here</a>.`;
    document.querySelector("footer").appendChild(resultsLink);

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

      case "datalist":
        const numGenerated = thisInput.querySelectorAll(".inputlist input[type='checkbox']:checked").length;
        if (numGenerated === 0) {
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