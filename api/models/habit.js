const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

class Habit {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.frequency = data.frequency
        this.goal = data.goal
        this.completed = data.completed
        this.streak = data.streak
        this.startdate = data.startdate
    }

    static get all() {
        return new Promise (async (res, rej) => {
            try {
                const db = await init()
                const habitsData = await db.collection('habits').find().toArray()
                const habits = habitsData.map(d => new User({ ...d, id: d._id }))
                res(habits);
            } catch (err) {
                console.log(err);
                rej("Error retrieving habits")
            }
        })
    }
}

module.exports = Habit;
