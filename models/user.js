const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

class User {
    constructor(data){
        this.id = data.id
        this.username = data.username
        this.email = data.email
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

    static create({ username, email, password }) {
        return new Promise(async(res, rej) => {
            try {
                const db = await init();
                let result = await db.collection('users').insertOne({ username, email, password })
                let newUser = new User(result.ops[0]);
                res (newUser);
            } catch (err) {
                rej(`Error creating user: ${err}`);
            }
        })
    }

    static findByEmail(email) {
        return new Promise(async (res, rej) => {
            try {
                const db = await init();
                let result = await db.collection('users').find({ email: email }).toArray();
                let user = new User(result.ops[0]);
                res(user);
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }
}

module.exports = User;
