const { log } = require('console');
const fs = require('fs');
const path = require('path');
const { Readable, Writable, pipeline } = require('stream');

//  source and destination directories
const sourceDir = '\source';
const destinationDir = '\destination'; 



// Ensure the destination directory exists, or create it
if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
}

// Function to recursively copy a directory
function copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
    }

    const files = fs.readdirSync(source);
    console.log(files)

    for (const file of files) {
        const sourceFilePath = path.join(source, file);
        const destinationFilePath = path.join(destination, file);

        const stats = fs.statSync(sourceFilePath);

        if (stats.isFile()) {
            // Copy files using streams
            const sourceStream = fs.createReadStream(sourceFilePath);
            const destinationStream = fs.createWriteStream(destinationFilePath);

            pipeline(sourceStream, destinationStream, (error) => {
                if (error) {
                    console.error(`Error copying file ${sourceFilePath}: ${error.message}`);
                } else {
                    console.log(`Copied file: ${sourceFilePath}`);
                }
            });
        } else if (stats.isDirectory()) {
            // Recursively copy subdirectories
            copyDirectory(sourceFilePath, destinationFilePath);
        }
    }
}

// Perform the backup
copyDirectory(sourceDir, destinationDir);

console.log('Backup completed successfully.');
