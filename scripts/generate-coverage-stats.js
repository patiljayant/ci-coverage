const fs = require('fs');
const path = require('path');

const generatedFileName = path.resolve(__dirname, '../coverage/coverage-summary.json');
const targetFileName = path.resolve(__dirname, '../artifact/report-main.json');


fs.readFile(generatedFileName, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file ${generatedFileName}: ${err}`);
        return;
    }

    fs.access(targetFileName, fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFile(targetFileName, data, (err) => {
                if (err) {
                    console.error(`Error writing file ${targetFileName}: ${err}`);
                    return;
                }
                console.log(`File ${targetFileName} created with content from ${generatedFileName}`);
            });
        } else {
            fs.writeFile(targetFileName, data, (err) => {
                if (err) {
                    console.error(`Error writing file ${targetFileName}: ${err}`);
                    return;
                }
                console.log(`Content from ${generatedFileName} copied to ${targetFileName}`);
            });
        }
    });
});
