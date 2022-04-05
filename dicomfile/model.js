
// Prepare image for prediction
// image: cornestone imageObj
// 
// 
// 
const processImage = (image) => {
    // TODO:add error handling to ensure correct datatype

    // convert Uint8array -> Uint32Array to prep for prediction
    const uint32 = new Uint32Array(image.data.byteArray.buffer);
    const height = image.height;
    const width = image.width;
    const data = {data: uint32, width:width, height:height}

    //set height and width required by model
    const MAX_WIDTH = 320;
    const MAX_HEIGHT = 320;
    let newHeight;
    let newWidth;

    // Change the resizing logic to ensure ratio is maintained if img not square
    if (width > height) {
        if (width > MAX_WIDTH) {
            newHeight = height * (MAX_WIDTH / width);
            newWidth = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            newWidth = width * (MAX_HEIGHT / height);
            newHeight = MAX_HEIGHT;
        }
    }

    return {img:data,newH:newHeight,newW:newWidth}
}

// predict :
// image: processed image object containing the Uint32Array, 
// original image height and with, and new height and with for resizing
// 
// 
// 
// 
// 
const detectText = async(processedImage) => {
    // load tflite model from tensorflowhub
    const tfliteModel = await tflite.loadTFLiteModel("https://tfhub.dev/sayakpaul/lite-model/east-text-detector/fp16/1");
    
    return console.log("model loaded")
    // Prepare input tensors.
    const img = tf.browser.fromPixels({data: image.data.byteArray, width:width, height:height});
    const input = tf.sub(tf.div(tf.expandDims(tf.image.resizeBilinear(img,[newHeight,newWidth])), 127.5), 1);

    // Run inference and get output tensors.
    let outputTensor = tfliteModel.predict(input);
    console.log(outputTensor);
}
detectText(chess);