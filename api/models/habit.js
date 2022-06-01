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
}

module.exports = Habit;
