const AWS = require('aws-sdk')

// process.env.AWS_SDK_LOAD_CONFIG = true
// process.env.AWS_PROFILE = 'UserTableManager'

AWS.config.update({
  region: 'us-east-1',
  // credentials: new AWS.SharedIniFileCredentials(),
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'Users'

const addUser = (name, password) =>
  documentClient
    .put({
      TableName: TABLE_NAME,
      Item: {
        username: name,
        password: password,
      },
      ConditionExpression: 'attribute_not_exists(username)',
    })
    .promise()

const getUserByName = (name) =>
  documentClient
    .get({
      TableName: TABLE_NAME,
      Key: {
        username: name,
      },
    })
    .promise()

const getAllUsers = () =>
  documentClient
    .scan({
      TableName: TABLE_NAME,
      Select: 'ALL_ATTRIBUTES',
    })
    .promise()

module.exports = {
  addUser,
  getUserByName,
  getAllUsers,
}
