const fs = require('fs');

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

readTextFile('../../02._Data_Files/me.txt');

module.exports = readTextFile;