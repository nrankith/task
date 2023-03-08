const docClient = new AWS.DynamoDB.DocumentClient();


module.exports.loadAnimals = async(animals)=> {

  return new Promise(async(resolve,reject) =>{

    try {

      // Iterate over each animal object and put it into the DynamoDB table

      for (const item of animals) {
        const params = {
          TableName: 'Animals',
          Item: item,
          ConditionExpression: 'attribute_not_exists(animal_name)', // overwrite/update existing data with same animal_name
        };
        await docClient.put(params).promise();
      }

      resolve (true);
    
    } catch (error) {

      console.log(`Error in loadAnimals ${error}`);

      reject(error);
    }
  });
}


module.exports.getAnimalsByClass = async(classType) => {

  return new Promise(async(resolve,reject) =>{

    try {

      const params = {
        TableName: 'YOUR_TABLE_NAME',
        FilterExpression: '#classType = :classTypeValue',
        ExpressionAttributeNames: {
          '#classType': 'class_type',
        },
        ExpressionAttributeValues: {
          ':classTypeValue': classType,
        },
      };
    
      const data = await dynamodb.scan(params).promise();    

      resolve (data.Items);
    
    } catch (error) {

      console.log(`Error in getAnimalsByClass ${error}`);

      reject(error);
    }
  });
}

module.exports.getAnimalsByTrait = async(trait) => {

  return new Promise(async(resolve,reject) =>{

    try {

      const params = {
        TableName: 'YOUR_TABLE_NAME',
        FilterExpression: 'contains(#traits, :traitValue)',
        ExpressionAttributeNames: {
          '#traits': 'traits',
        },
        ExpressionAttributeValues: {
          ':traitValue': trait,
        },
      };
    
      const data = await dynamodb.scan(params).promise();

      resolve (data.Items);
         
    } catch (error) {

      console.log(`Error in getAnimalsByTrait ${error}`);

      reject(error);
    }
  });
}