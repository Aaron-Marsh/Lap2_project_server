const { MongoClient } = require('mongodb');
const connectionUrl = "mongodb://billie:habitpass@db:27017";

const dbName = "habitrabbits"

const init = async () => {
  let client = await MongoClient.connect(connectionUrl)
  console.log('connected to database!', dbName)
  return client.db(dbName)
}

// const fs = require('fs');
const request = require('supertest');
const apiServer = require('../../server');
// import reset query
// const reset = fs.readFileSync(__dirname + '/reset.mongodb').toString();
// enable resetting of db between tests
const resetTestDB = () => {
    return new Promise (async (res, rej) => {
        try {
            init()

            await db.collection('habits').drop()
            await db.collection('users').drop()
            
            await db.collection('habits').insertMany([
                { title: "Drink water", frequency: "Daily", goal: 1, current: 1, completed: true, streak: 2, userId: "62a1cb615a99baaac3eeedd1" },
                { title: "Exercise", frequency: "Weekly", goal: 1, current: 1, completed: true, streak: 3, userId: "62a1cb615a99baaac3eeedd1" },
                { title: "Eat 5 fruit", frequency: "Monthly", goal: 5, current: 5, completed: true, streak: 4, userId: "62a1cb615a99baaac3eeedd1" },
                { title: "Go for a walk", frequency: "Daily", goal: 5, current: 2, completed: false, streak: 5, userId: "62a1cb615a99baaac3eeedd1" },
                { title: "Exercise", frequency: "Daily", goal: 1, current: 1, completed: true, streak: 2, userId: "62a1bc285aa15bb7bda8bf5a" }
            ])
            
            await db.collection('users').insertMany([
                { username: "Aaron", passwordDigest: "$2a$10$kKNAyCjbI.ZQQK16oI/s/OpoZg6dGbHEjmv1dNZMxAd/G/75nJfj.", prevDate:"6/9/2022" },
                { username: "Billie", passwordDigest: "needtogetahashedpassword", prevDate:"6/8/2022" },
                { username: "Gio", passwordDigest: "needtogetahashedpassword", prevDate:"6/8/2022" },
                { username: "Tom", passwordDigest: "needtogetahashedpassword", prevDate:"6/8/2022" }
            ])
            

            res('Test DB reset')
        } catch (err) {
            rej('Could not reset TestDB')
        }
    })
}
// make these things available to test suites
global.request = request
global.app = apiServer
global.resetTestDB = resetTestDB
