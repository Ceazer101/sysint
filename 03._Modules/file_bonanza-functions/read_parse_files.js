const fs = require('fs');
const xml2js = require('xml2js');
const csvParser = require('csv-parser');
const yaml = require('js-yaml');

function readTextFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        console.log('Text from', filename, ':');
        console.log(data);
    });
}

function readAndParseXML(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Error parsing XML:', parseErr);
                return;
            }
            
            const me = result.me;
            const name = me.name[0];
            const age = me.age[0];
            const hobbies = me.hobbies[0].hobby;

            console.log('Name:', name);
            console.log('Age:', age);
            console.log('Hobbies:', hobbies.join(', '));
        });
    });
}

function readAndParseJSON(filename) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(filename, 'utf8'));
        console.log('Parsed JSON:', jsonData);
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
}

function readAndParseCSV(filename) {
    const results = [];
    fs.createReadStream(filename)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log('Parsed CSV:', results);
        });
}

function readAndParseYAML(filename) {
    try {
        const yamlData = yaml.load(fs.readFileSync(filename, 'utf8'));
        console.log('Parsed YAML:', yamlData);
    } catch (err) {
        console.error('Error parsing YAML:', err);
    }
}

module.exports = { readTextFile, readAndParseXML, readAndParseJSON, readAndParseCSV, readAndParseYAML };