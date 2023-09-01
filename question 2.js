const async = require('async');

function processItem(item, callback) {
    // Simulate some processing time
    setTimeout(() => {
        const result = item * 2; // Multiply the item by 2
        console.log(`Processed item ${item}. Result: ${result}`);
        callback(null, result);
    }, 1000); // One-second delay
}

const numbers = [1, 3, 5, 6, 3];

// Using async.mapSeries to process items sequentially
async.mapSeries(numbers, processItem, (error, results) => {
    if (error) {
        console.error('An error occurred:', error);
    } else {
        console.log('All items processed:', results);
    }
});
