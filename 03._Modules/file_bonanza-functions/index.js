const { readTextFile, readAndParseXML } = require('./read_parse_files');

// Get the command-line argument
const option = process.argv[2];

// Call the appropriate function based on the argument
if (option === 'txt') {
    readTextFile('../../02._Data_Files/me.txt');
} else if (option === 'xml') {
    readAndParseXML('../../02._Data_Files/me.xml');
} else {
    console.log('Please provide a valid argument: "text" or "xml"');
}
