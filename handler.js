const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDb = require('./Database/dynamoDB');
const csvService = require('./Utils/csvParser');



module.exports.loadDataToDB = async (event, context, callback) => {

  try {

  // Get the object key and bucket name from the event record

    const bucketName = event.Records[0].s3.bucket.name;

    const objectKey = event.Records[0].s3.object.key;

    // Read the contents of the CSV file from S3

    const data = await s3.getObject({ Bucket: bucketName, Key: objectKey }).promise();

    // Parse the CSV data into an array of objects

    const animals = csvService.parseCSV(data.Body.toString());

    // Load the animal data into the DynamoDB table

    await dynamoDb.loadAnimals(animals);

    callback(null, 'Animal data loaded successfully.');
      
  } catch (error) {

    console.log(`Error in loadDataToDB ${error}`);

    callback(null, 'Error in loadDataToDB');
    
  }
};

module.exports.getAnimals = async (event, context, callback) => {

  try {

    const query = event.info.fieldName;

    switch (query) {

      case 'animalsByClass':
        return dynamoDb.getAnimalsByClass(event.arguments.class_type);

      case 'animalsByTrait':
        return dynamoDb.getAnimalsByTrait(event.arguments.trait);
         
      default:
        return null;
    }
    
  } catch (error) {
    
    console.log(`Error in getAnimals ${error}`);

    return(null, 'Error in getAnimals');
    
  }

}