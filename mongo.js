const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Aaron:hHw659AirIPVfL5O@cluster0.6znh3nh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(async err => {
  const collection = client.db("habitrabbits").collection("habits");
  // perform actions on the collection object

  

  let agg = await collection.aggregate([
    {
      '$match': {
        "title": "Exercise"
        }
      
    },
    {
      '$limit': 5
    },
    {
      '$project': {
        "_id": 0,
        "title": 1,
        "frequency": 1
      }
    }
  ]).toArray();
  console.log(agg)
  console.log(agg[0].title)

  client.close();
});
