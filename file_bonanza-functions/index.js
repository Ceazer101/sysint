import { readTextFile, readAndParseXML, readAndParseJSON, readAndParseCSV, readAndParseYAML } from './read_parse_files.js';

const option = process.argv[2];

if (option === 'txt') {
    readTextFile('../02._Data_Files/intro.txt');
} else if (option === 'xml') {
    readAndParseXML('../02._Data_Files/skills.xml');
} else if (option === 'json') {
    readAndParseJSON('../02._Data_Files/me.json');
} else if (option === 'csv') {
    readAndParseCSV('../02._Data_Files/class.csv');
} else if (option === 'yaml') {
    readAndParseYAML('../02._Data_Files/gear.yaml');
} else {
    console.log('Please provide a valid argument: "txt", "xml", "json", "csv" or "yaml"');
}
