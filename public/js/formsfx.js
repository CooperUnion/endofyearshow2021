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

	//   let allDroppedFiles = {};

	const formsBody = document.querySelector(".main");
	const formsForm = formsBody.querySelector("form");
	const submitButton = document.querySelector("button[type='submit']");
	submitButton.addEventListener("click", validateAndSubmit);

	const allInputs = document.querySelectorAll(".formblock .form-input input, .formblock .form-input textarea");
	allInputs.forEach(function(thisInput, currentIndex) {
		thisInput.addEventListener("change", validateAllInputs);
		if (thisInput.type === "checkbox") {
			thisInput.addEventListener("change", toggleCheckTag);
		}
		if (thisInput.type === "file") {
      
 			const inputBlock = thisInput.closest(".form-input"),
				// promptClear = inputBlock.querySelector("button.clear"),
				clearAll = inputBlock.querySelector(".clearall"),
				uploadIt = inputBlock.querySelector(".uploadit"),
				promptList = inputBlock.querySelector(".promptlist"),
				summaryInput = inputBlock.closest(".formblock").querySelector(":scope > .form-input");   
      
			inputBlock.classList.add("has-advanced-upload"); // designating the file-select inputs for drag-and-drop decoration

			inputBlock.addEventListener("drop", handleFileOperation);
			thisInput.addEventListener("change", handleFileOperation);
			uploadIt.addEventListener("click", uploadToWordpress);
			clearAll.addEventListener("click", clearfileInputSelections);
      
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
					//           if (!thisInput.matches('[data-destination="external"]')) { // Excluding the Vimeo uploader file from submission
					//             allDroppedFiles[thisInput.id] = e.dataTransfer.files;
					//           }
					validateAllInputs();
				} else {
					thisInput.submittedFiles = thisInput.files;
				}
				clearAll.disabled = thisInput.submittedFiles.length > 0 ? false : true;
				uploadIt.textContent = thisInput.submittedFiles.length === 1 ? "Upload it" : "Upload them";
				promptList.innerHTML = `
          ${[...thisInput.submittedFiles].map((item, i) => `
            <dt class="filethumb"><img class="genthumb"></dt>
            <dd class="filemeta" data-required="required"><span class="pseudolabel">Alt text:</span><input type="text" class="alttextfield" placeholder="Description of ${item.name}"></dd>`.trim()).join('')}
        `;

				[...thisInput.submittedFiles].forEach(function(file, i) {
					let reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onloadend = function() {
						promptList.querySelectorAll("img.genthumb")[i].src = reader.result;
					};

					promptList.querySelectorAll(".filemeta")[i].addEventListener("change", validateAltText);
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

			// function clearInput(e) {
			// 	e.preventDefault();
			// 	e.stopPropagation();
			// 	thisInput.value = "";
			// 	clearfileInputSelections();
			// 	notifyChange(thisInput); // The input's change event does not fire when changed programmatically
			// }

			function notifyChange(inputObj) {
				const evt = new Event("change");
				inputObj.dispatchEvent(evt);
			}

			async function uploadToWordpress(e) {
				e.preventDefault();
				clearAll.disabled = true;
				uploadIt.disabled = true;
				uploadIt.textContent = "Uploading…";
				promptList.classList.add("uploading");
				promptList.querySelectorAll(".alttextfield").forEach(function(textfield) {
					textfield.readOnly = true;
				});

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
				// document.querySelector("code").innerHTML = JSON.stringify(response, null, "\t");
				resolveFromWordpress(response);
			}

			function resolveFromWordpress(response) {
				clearfileInputSelections();
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
			}

			function clearfileInputSelections() {
				promptList.innerHTML = "";
				promptList.classList.remove("uploading");
				// thisInput.dataset.filecount = 0;
				inputBlock.classList.remove("populated");
				thisInput.submittedFiles = {};
				thisInput.value = "";
			}

			["drag",
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
            
		}
    
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

	function toggleCheckTag(e) {
		const checkTag = this.closest("li");
		if (this.checked) {
			checkTag.classList.add("checked");
		} else {
			checkTag.classList.remove("checked");
		}
	}

	async function validateAndSubmit(e) {
		e.preventDefault();

		if (validateAllInputs()) {
			const formData = new FormData(formsForm);
			//       for (let key in allDroppedFiles) {
			//         Array.from(allDroppedFiles[key]).forEach(file => { 
			//           formData.append('file', file);
			//         });
			//       }
			const response = await fetch("/wp/formData", {
				method: "POST",
				body: formData
			});
			const json = await response.json();
			console.log(json);
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

				//     case "file":
				//         
				//       const thisInputField = thisInput.querySelector("input[type='file']");
				//       if (!(thisInputField.id in allDroppedFiles) && thisInputField.files.length === 0) {
				//         isValid = false;
				//       }      
				// 
				//       break;


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