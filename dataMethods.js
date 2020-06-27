const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

process.env.AWS_SDK_LOAD_CONFIG = true
process.env.AWS_PROFILE = 'UserTableManager'

AWS.config.update({
  credentials: new AWS.SharedIniFileCredentials(),
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'Users'

const scanTable = () => documentClient.scan({ TableName: TABLE_NAME }).promise()

const addUser = (email, password) =>
  documentClient
    .put({
      TableName: TABLE_NAME,
      Item: {
        id: uuidv4(),
        email: email,
        password: password,
      },
      ReturnValues: 'ALL_OLD',
    })
    .promise()

const getUserById = (id) =>
  documentClient
    .get({
      TableName: TABLE_NAME,
      Key: { id },
    })
    .promise()

const getUserByEmail = (email) =>
  documentClient
    .scan({
      TableName: TABLE_NAME,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    })
    .promise()

module.exports = {
  scanTable,
  addUser,
  getUserById,
  getUserByEmail,
}
