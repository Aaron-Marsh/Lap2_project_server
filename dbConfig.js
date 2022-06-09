const { MongoClient } = require('mongodb') //brings in mongo
const connectionUrl = "mongodb://billie:habitpass@db:27017";

const dbName = "habitrabbits"

const init = async () => {
  let client = await MongoClient.connect(connectionUrl)
  console.log('connected to database!', dbName)
  return client.db(dbName)
}


module.exports = { init }; // exports the init function
