const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')
// const { create } = require('./habit')

class User {
    constructor(data){
        this.id = data.id
        this.username = data.username
        this.passwordDigest = data.passwordDigest
        this.prevDate = data.prevDate
    }

    static get all() {
        return new Promise (async (res, rej) => {
            try {
                const db = await init()
                const usersData = await db.collection('users').find().toArray()
                const users = usersData.map(d => new User({ ...d, id: d._id }))
                res(users);
            } catch (err) {
                console.log(err);
                rej("Error retrieving users")
            }
        })
    }

    static create({ username, password }) {
        return new Promise(async(res, rej) => {
            try {
                const db = await init();
                // get date (could do on client side)
                let today = new Date;
                let currentdate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

                let result = await db.collection('users').insertOne({ username, passwordDigest: password, prevDate: currentdate });
                let newUser = new User(result.insertedId);
                res (newUser);
            } catch (err) {
                rej(`Error creating user: ${err}`);
            }
        })
    }

    static findByUsername(username) {
        return new Promise(async (res, rej) => {
            try {
                const db = await init();
                let result = await db.collection('users').find({ username }).toArray();
                let user = new User({...result[0], id: result[0]._id});
                res(user);
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }

    static usernameExists(username) {
        return new Promise(async (res, rej) => {
            try {
                const db = await init();
                let result = await db.collection('users').find({ username }).toArray();
                let user = new User({...result[0]});
                let exists = true;
                if (!user.username) {
                    exists = false
                }
                res(exists);
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }
}

module.exports = User;
