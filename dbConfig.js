const { MongoClient } = require('mongodb') //brings in mongo
const connectionUrl = process.env.MONGODB_URI || "mongodb+srv://Aaron:hHw659AirIPVfL5O@cluster0.6znh3nh.mongodb.net/test";

const dbName = "habitrabbits"

const init = async () => {
  let client = await MongoClient.connect(connectionUrl)
  console.log('connected to database!', dbName)
  return client.db(dbName)
}


module.exports = { init }; // exports the init function
