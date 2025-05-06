$(document).ready(function() {
    // I MUST REMEMBER  THIS IS TO Fetch fact from Numbers API
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        method: 'GET',
        success: function(data) {
            $('#fact-text').text(data.text || 'No fact available today.');
        },
        error: function() {
            $('#fact-text').text('Failed to load fact.');
        }
    });


    // Upload section functionality
    const dropArea = document.querySelector(".drag-area");
    const dragFile = dropArea.querySelector(".drag-file");
    const button = dropArea.querySelector(".file-input-button");
    const input = dropArea.querySelector(".file-input");
    const documentImages = document.querySelector("#document-images");
    const filesizeErrorMessage = document.querySelector("#filesize-error");
    const filetypeErrorMessage = document.querySelector("#filetype-error");
    const inputEmptyError = document.querySelector("#input-empty-error");


    // Object to store selected file names
    let documentFileObj = {
        fileName: []
    };


    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });


    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }


    // Highlight drop area on drag
    dropArea.addEventListener("dragover", () => {
        dropArea.classList.add("bg-gray-100");
        dragFile.textContent = "Release to Upload File";
    });


    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("bg-gray-100");
        dragFile.textContent = "Drag files here to upload";
    });


    // Handle dropped files
    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("bg-gray-100");
        dragFile.textContent = "Drag files here to upload";
        handleFiles(e.dataTransfer.files);
    });


    // Trigger file input on button click
    button.addEventListener("click", () => {
        input.click();
    });


    // Handle file selection
    input.addEventListener("change", function() {
        handleFiles(this.files);
    });


    // Handle file deletion
    documentImages.addEventListener("click", (e) => {
        const deleteButton = e.target.closest(".delete-document");
        if (!deleteButton) return;
        const documentToDelete = deleteButton.closest(".document-file");
        const documentName = documentToDelete.querySelector("span").textContent;
        documentFileObj.fileName = documentFileObj.fileName.filter(name => name !== documentName);
        documentImages.removeChild(documentToDelete);
    });


    // Navigation
    document.body.addEventListener("click", (e) => {
        const target = e.target;
        const prevButton = target.closest(".document-prev-button");
        const nextButton = target.closest(".document-next-button");
        const sectionContainer = target.closest("#upload-section");


        if (nextButton) {
            if (documentFileObj.fileName.length > 0) {
                uploadFiles(sectionContainer);
            } else {
                inputEmptyError.textContent = "Please select at least one image!";
                inputEmptyError.classList.remove("hidden");
                setTimeout(() => {
                    inputEmptyError.classList.add("hidden");
                }, 2000);
            }
        }


        if (prevButton) {
            // Optional: Implement navigation to a previous section if needed
            console.log("Back button clicked");
        }
    });


    // Determine file type icon
    function fileTypeLogo(fileType) {
        return ["jpg", "jpeg", "png"].includes(fileType) ? "text-violet-600 fa-image" : "";
    }


    // Handle file processing
    function handleFiles(files) {
        filesizeErrorMessage.classList.add("hidden");
        filetypeErrorMessage.classList.add("hidden");


        const validFiles = Array.from(files).filter(file => {
            const fileType = file.type.split("/").pop().toLowerCase();
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);


            // Validate file type
            if (!["image/jpeg", "image/png"].includes(file.type)) {
                filetypeErrorMessage.classList.remove("hidden");
                return false;
            }


            // Validate file size
            if (sizeInMB > 5) {
                filesizeErrorMessage.classList.remove("hidden");
                return false;
            }


            return true;
        });


        if (validFiles.length === 0) {
            return;
        }


        validFiles.forEach(file => {
            const fileName = file.name;
            const fileType = file.type.split("/").pop().toLowerCase();
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);


            // Avoid duplicate files
            if (documentFileObj.fileName.includes(fileName)) {
                return;
            }


            // Add file to list
            const newDocument = document.createElement("li");
            newDocument.className = "py-3 flex justify-between items-center md:items-end text-xs md:text-sm text-slate-700 border-b-2 border-slate-100 gap-1 document-file";
            newDocument.innerHTML = `
                <p class="whitespace-nowrap overflow-hidden text-ellipsis w-40">
                    <i class="fa-solid text-xl mr-5 ${fileTypeLogo(fileType)}"></i>
                    <span>${fileName}</span>
                </p>
                <p>${fileType.toUpperCase()}</p>
                <p>${sizeInMB}MB</p>
                <p>Selected</p>
                <button class="delete-document"><i class="fa-solid fa-trash"></i></button>
            `;
            documentImages.appendChild(newDocument);
            documentFileObj.fileName.push(fileName);
        });


        // Store files for upload
        documentFileObj.files = validFiles;
    }


    // Upload files to server
    function uploadFiles(sectionContainer) {
        const formData = new FormData();
        documentFileObj.files.forEach(file => {
            formData.append("images", file);
        });


        $.ajax({
            url: 'http://localhost:3000/api/upload',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                sectionContainer.innerHTML = '<div class="text-center"><p class="text-success">Images uploaded successfully!</p></div>';
            },
            error: function() {
                sectionContainer.innerHTML = '<div class="text-center"><p class="text-danger">Failed to upload images.</p></div>';
            }
        });
    }
});