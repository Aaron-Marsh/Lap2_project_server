const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

class User {
    constructor(data){
        this.username = data.username
        this.email = data.email
        this.passwordDigest = data.password
    }
}

module.exports = User;
