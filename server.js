const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

process.env.AWS_SDK_LOAD_CONFIG = true
process.env.AWS_PROFILE = 'UserTableManager'

AWS.config.update({
  credentials: new AWS.SharedIniFileCredentials(),
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'Users'

const scanTable = () => {
  documentClient.scan(
    {
      TableName: TABLE_NAME,
    },
    (err, data) => {
      if (err) console.log('err', err)
      else console.log('data', data)
    }
  )
}

const createUser = (email, password) => {
  documentClient.put(
    {
      TableName: TABLE_NAME,
      Item: {
        id: uuidv4(),
        email: email,
        password: password,
      },
    },
    (err, data) => {
      if (err) console.log('err', err)
      else console.log('data', data)
    }
  )
}

scanTable()
