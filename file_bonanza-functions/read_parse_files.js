import * as fs from 'fs';
import * as xml2js from 'xml2js';
import * as csvParser from 'csv-parser';
import * as yaml from 'js-yaml';

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
            
            const skills = result.skills;
            const cantrips = skills.cantrips[0].cantrip;
            const spells = skills.spells[0].spell;
            const wildshape = {
                animals: skills.wildshape[0].animal,
                elementals: skills.wildshape[0].elemental
            };

            const parsedData = {
                cantrips: cantrips,
                spells: spells,
                wildshape: wildshape
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

export { readTextFile, readAndParseXML, readAndParseJSON, readAndParseCSV, readAndParseYAML };