const express = require("express");
const { readTextFile, readAndParseXML, readAndParseJSON, readAndParseCSV, readAndParseYAML } = require('./read_parse_files');

const app = express();

// Route handler for txt files
app.get("/", (req, res) => {
    readTextFile('../02._Data_Files/intro.txt', (err, txtFile) => {
        if (err) {
            res.status(500).send({ error: "Error reading text file" });
            return;
        }
        res.send({ content: txtFile });
    });
});

// Route handler for XML files
app.get("/skills", (req, res) => {
    readAndParseXML('../02._Data_Files/skills.xml', (err, xmlData) => {
        if (err) {
            res.status(500).send({ error: "Error parsing XML file" });
            return;
        }
        res.send({ content: xmlData });
    });
});

// Route handler for JSON files
app.get("/me", (req, res) => {
    readAndParseJSON('../02._Data_Files/me.json', (err, jsonData) => {
        if (err) {
            res.status(500).send({ error: "Error parsing JSON file" });
            return;
        }
        res.send({ content: jsonData });
    });
});

// Route handler for CSV files
app.get("/class", (req, res) => {
    readAndParseCSV('../02._Data_Files/class.csv', (err, csvData) => {
        if (err) {
            res.status(500).send({ error: "Error parsing CSV file" });
            return;
        }
        res.send({ content: csvData });
    });
});

// Route handler for YAML files
app.get("/gear", (req, res) => {
    readAndParseYAML('../02._Data_Files/gear.yaml', (err, yamlData) => {
        if (err) {
            res.status(500).send({ error: "Error parsing YAML file" });
            return;
        }
        res.send({ content: yamlData });
    });
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
