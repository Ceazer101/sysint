import express from "express";
import axios from "axios";
import { 
    readTextFile, 
    readAndParseXML, 
    readAndParseJSON, 
    readAndParseCSV, 
    readAndParseYAML 
} from './read_parse_files.js';

const app = express();

const serverBUrl = "http://localhost:8080"; // Assuming Server B is running on port 8080

app.get("/", (req, res) => {
    res.send ({ message: "Select a file by writing 'txt', 'json', 'csv', 'xml' or 'yaml'" });
});

// Route handler for all file types
app.get("/:format", async (req, res) => {
    const format = req.params.format;
    // Check if the request is coming from a client
    if (!req.headers['x-server-b-request']) {
        try {
            const response = await axios.get(`${serverBUrl}/${format}`, { headers: { 'x-server-a-request': true } });
            res.send(response.data);
        } catch (error) {
            res.status(error.response.status).send(error.response.data);
        }
    } else {
        // Handle each format separately
        const filename = `../02._Data_Files/me.${format}`;
        if (format === 'txt') {
            readTextFile(filename, (err, txtFile) => {
                if (err) {
                    res.status(500).send({ error: "Error reading text file" });
                    return;
                }
                res.send({ content: txtFile });
            });
        } else if (format === 'xml') {
            readAndParseXML(filename, (err, xmlData) => {
                if (err) {
                    res.status(500).send({ error: "Error parsing XML file" });
                    return;
                }
                res.send({ content: xmlData });
            });
        } else if (format === 'json') {
            readAndParseJSON(filename, (err, jsonData) => {
                if (err) {
                    res.status(500).send({ error: "Error parsing JSON file" });
                    return;
                }
                res.send({ content: jsonData });
            });
        } else if (format === 'csv') {
            readAndParseCSV(filename, (err, csvData) => {
                if (err) {
                    res.status(500).send({ error: "Error parsing CSV file" });
                    return;
                }
                res.send({ content: csvData });
            });
        } else if (format === 'yaml') {
            readAndParseYAML(filename, (err, yamlData) => {
                if (err) {
                    res.status(500).send({ error: "Error parsing YAML file" });
                    return;
                }
                res.send({ content: yamlData });
            });
        } else {
            res.status(400).send({ error: `Unsupported format: ${format}` });
        }
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server is running on port", PORT));
