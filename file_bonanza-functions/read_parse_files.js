const fs = require('fs');
const xml2js = require('xml2js');
const csvParser = require('csv-parser');
const yaml = require('js-yaml');

function readTextFile(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
}

function readAndParseXML(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }

        xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
                callback(parseErr, null);
                return;
            }
            
            const me = result.me;
            const name = me.name[0];
            const age = me.age[0];
            const hobbies = me.hobbies[0].hobby;

            const parsedData = {
                name: name,
                age: age,
                hobbies: hobbies
            };

            callback(null, parsedData);
        });
    });
}

function readAndParseJSON(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            callback(null, jsonData);
        } catch (parseErr) {
            callback(parseErr, null);
        }
    });
}

function readAndParseCSV(filename, callback) {
    const results = [];
    fs.createReadStream(filename)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            callback(null, results);
        });
}

function readAndParseYAML(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }

        try {
            const yamlData = yaml.load(data);
            callback(null, yamlData);
        } catch (parseErr) {
            callback(parseErr, null);
        }
    });
}

module.exports = { readTextFile, readAndParseXML, readAndParseJSON, readAndParseCSV, readAndParseYAML };