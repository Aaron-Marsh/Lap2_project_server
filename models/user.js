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

    static findById(id) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init();
                let userData = await db.collection('users').find({ _id: ObjectId(id) }).toArray()
                let user = new User({...userData[0], id: userData[0]._id});
                res(user);
            } catch(err) {
                rej('User not found')
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

    update(newPrevDate) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init();
                const updatedUser = await db.collection('users').updateOne( {_id: ObjectId(this.id) }, {$set: {prevDate: newPrevDate}})
                res(updatedUser);
            } catch(err) {
                rej('User could not be updated')
            }
        })



    }

    static findByUsername(username) {
        return new Promise(async (res, rej) => {
            try {
                const db = await init();
                let result = await db.collection('users').find({ username: username }).toArray();
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
