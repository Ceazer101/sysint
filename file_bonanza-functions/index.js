const { readTextFile, readAndParseXML, readAndParseJSON, readAndParseCSV, readAndParseYAML } = require('./read_parse_files');

const option = process.argv[2];

if (option === 'txt') {
    readTextFile('../02._Data_Files/me.txt');
} else if (option === 'xml') {
    readAndParseXML('../02._Data_Files/me.xml');
} else if (option === 'json') {
    readAndParseJSON('../02._Data_Files/me.json');
} else if (option === 'csv') {
    readAndParseCSV('../02._Data_Files/me.csv');
} else if (option === 'yaml') {
    readAndParseYAML('../02._Data_Files/me.yaml');
} else {
    console.log('Please provide a valid argument: "txt", "xml", "json", "csv" or "yaml"');
}
