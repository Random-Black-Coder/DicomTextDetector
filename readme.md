PROJECT: DICOM TEXT DETECTOR

PURPOSE: Display uploaded dicom images in the browser, 
detect if text is present and remove it.

DEPENDENCIES: 
* WADOIMAGELOADER - Enables decoding of uploaded dicom images in the browser
* CORNERSTONE - Enables decoding of DICOM images, and other Dicom tooling
* TFJS-TFLITE - Provides wrapper around tflite model api that allows tfjs to use tflite models without converting them
* TFJS - Provides core tensorflowjs operations
* BOOTSTRAP CSS - (optional) Only for example styling
* CORNERSTONE CSS - (optional) Only for example styling
* DICOMPARSER - (optional) Only for example to parse extra information from DICOM images

DEMO:
To test this code all you need to do is navigate to /dicomfile/index.html and open it in the browser.
Currently it displays the uploaded dicom image along with some of it's information, and makes a prediction for the presence of text.
The output tensor data still needs to be processed, and the code for the removal needs to be added.
The test file is in the /dicomfile folder called 1-1.dcm

TODOS: 
*Parse out data from output tensors
*Implement text removal functionality using the coordinates from the model 
*Finish modularizing the code (break image processing, text detection, and text removal into their own functions)
*Finish placing code in it's own dicom-text-detector npm package
*Implement error handling to account for model loading failure, prediction confidence thresholds, incorrect file formats, input typing etc..
*Ensure funtions support multiple browsers
*Provide support for batch image displaying, detecting and text removal

PROPOSED PACKAGE LIBARY STRUCTURE:
/dicom-text-detector
    /src
        /cornerstone
            cornerstone.js
                [exports cornerstone object]*these functions currently need to be run directly in script file in html due to cornestone package reliance on having direct assess to dom
                    cornerstoneWADOImageLoader.wadouri.fileManager.add(raw uploaded DICOM file) => return cornerstone imageID
                    loadImage(cornerstone imageId obj) => return cornerstone img obj    
                    getDefaultViewPort(html element, cornerstone img obj) => return viewport
                    displayImg(html element, cornestone img obj, viewport) => display the image in viewport
            supporting files
        /model
            model.js
                [exports model object]
                    processImg(cornerstone imgObj) => return {unit32array,orginalHeight, originalWidth,newHeight,newWidth}
                    detectText({unit32array,orginalHeight, originalWidth,newHeight,newWidth}) => return [{pixelCoordinates}]
                    processAndDetect(cornerstone imgObj) => return [{pixelCoordinates}]
                    removeText(cornerstone imgObj, newHeight, newWidth, [{pixelCoordinates}]) => return {cornerstone cleanedImgObj}
                    processAndDetectAndClean(cornerstone imgObj) => return {cornerstone cleanedImgObj}
    index.js
        [exports dicomTextDetecor obj] * contains both the cornerstone obj and model obj
    package-lock.json
    package.json



CONCERNS:
*A text detection model trained on dicom images specifically may be more effective,
there is a DICOM image dataset that could be used for this.
* Tfjs-tflite package is less than 5 months old and very experimental so it may not
be reliable in production.
*Cornertone is heavily reliant on being used directly in the browser. It doesn't work properly
in a node environment that doesn't have access to the browser so the ability to abstract it's 
functionality away in a new package is limited without directly modifying the source code. Thus
the new package would mostly be a wrapper that groups the cornerstone functionality with the text detection code.

