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
    
    updateOnNewDay(currentDate) {
        console.log('using function')

        return new Promise (async (res, rej) => {
            try {
            const db = await init();
                
            let userId = this.id.toString()
            let prevDateAsDate = new Date(this.prevDate)
            let currentDateAsDate = new Date(currentDate)
            let prevDateSeconds = prevDateAsDate.getTime()
            let currentDateSeconds = currentDateAsDate.getTime()
                console.log(prevDateSeconds)
                console.log(this.prevDate)
                console.log(currentDateSeconds)
                console.log(currentDate)
                console.log(userId)

                // Update all daily habits
            if (( prevDateSeconds + 1000 * 3600 * 24) < currentDateSeconds) {
                // If more than one day since login, end all daily streaks
                await db.collection('habits').updateMany( { userId, frequency: 'daily' }, { $set: { streak: 0}} )
            } else {
                // if one day since login, end streaks for uncompleted daily habits
                await db.collection('habits').updateMany( { userId, completed: false, frequency: 'daily' }, { $set: { streak: 0}} )
            }
                // set current to 0 and completed to false for all daily habits
            await db.collection('habits').updateMany( { userId, frequency: 'daily' }, {$set: {current: 0, completed: false }})
            res('Update on new day complete')



        } catch(err) {
            rej('Could not complete update on new day')
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
