module.exports = {
    path: '../EE - Planetary Resource Locations.csv', // Your CSV file name
    firebase: {
        credential: '../workshop-bot-286003-597bb10efe90.json', // Your service account file name
        collection: 'planet_resources', // target Collection in Firestore
    },
    mapper: (dataFromCSV) => { // Mapper Method as optional field
        return dataFromCSV // Return data for saving in Firestore
    }
}