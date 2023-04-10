// Define the text strings for each line
var line1 = "An Identity infrastructure for";
var line2 = "Web3 communities to";
var line3 = "onboard the next billion users";

// Create a new text layer
var mytextlayer = app.project.activeItem.layers.addText("");

// Set the text layer's source text to an empty string
var mysourcetext = mytextlayer.property("Source Text");
mysourcetext.setValue("");

// Define the text document object
var mytextdoc = mysourcetext.value;

// Set the text document's properties
mytextdoc.font = "Prata";
mytextdoc.fontSize = 100;
mytextdoc.fillColor = [1, 1, 1];
mytextdoc.strokeWidth = 0;
mytextdoc.strokeColor = [0, 0, 0];

// Set the duration for each line to appear
var lineduration = 2; // in seconds

// Create a loop to type out each line
for (var i = 0; i < 3; i++) {

    // Set the text for the current line
    switch (i) {
        case 0:
            mytextdoc.text = line1;
            break;
        case 1:
            mytextdoc.text = line2;
            break;
        case 2:
            mytextdoc.text = line3;
            break;
    }

    // Calculate the duration for typing out the current line
    var typduration = mytextdoc.text.length / 10; // 10 characters per second

    // Create a keyframe for the source text property at the current time
    var keyframevalue = mysourcetext.value;
    keyframevalue.text = mytextdoc.text.substring(0, 1); // start with the first character
    mysourcetext.setValueAtTime(app.project.activeItem.time, keyframevalue);

    // Add keyframes to type out the rest of the text
    for (var j = 1; j < mytextdoc.text.length; j++) {
        keyframevalue.text = mytextdoc.text.substring(0, j + 1); // add one character at a time
        mysourcetext.setValueAtTime(app.project.activeItem.time + j / 10, keyframevalue); // add a keyframe every 0.1 seconds
    }

    // Add a keyframe to hold the text for the duration of the line
    mysourcetext.setValueAtTime(app.project.activeItem.time + typduration, mytextdoc);

    // Move the current time to the end of the current line
    app.project.activeItem.time += lineduration;
}