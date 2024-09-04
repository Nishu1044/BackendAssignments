const fs = require('fs');

// console.log(process.argv);

if (process.argv[2] == "read") {
    fs.readFile(process.argv[3], 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });

} else if (process.argv[2] == "append") {
    fs.appendFileSync(process.argv[3], '\n'+process.argv[4]);
    console.log('Data appended successfully');

} else if (process.argv[2] == 'write') {
    fs.writeFileSync(process.argv[3], process.argv[4]);
    console.log(`File written ${process.argv[3]} success`);

} else if (process.argv[2] == 'delete') {
    fs.unlink(process.argv[3], (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`File ${process.argv[3]} deleted`);
        }
    });

} else if (process.argv[2] == 'rename') {
    fs.rename(process.argv[3], process.argv[4], (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`File renamed successfully to ${process.argv[4]}`);
        }
    });

} else if (process.argv[2] == 'list') {
    fs.readdir(process.argv[3] || '.', (err, files) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Files in directory:');
            files.forEach(file => {
                console.log(file);
            });
        }
    });

} else {
    console.log('Invalid operation. Please use "read", "append", "write", "delete", "rename", or "list".');
}
