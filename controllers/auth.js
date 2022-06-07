const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Habit = require('../models/habit');
const { showUserHabits } = require('./habits');

async function register(req, res) {
    try {
        const usernameExists = await User.usernameExists(req.body.username);
        if (!usernameExists) {
            const salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash(req.body.password, salt);
            await User.create({...req.body, password: hashed});
            res.status(201).json({msg: 'User created'});
        } else {
            res.json({msg: 'Username taken'})
        } 
    } catch (err) {
        res.status(500).json({err});
    }
}

async function login(req, res) {
    try {
        const user = await User.findByUsername(req.body.username);
        if(!user){ throw new Error('No user with this username') }
        const authed = await bcrypt.compare(req.body.password, user.passwordDigest)
        if (authed) {
            res.status(200).json({ username: user.username, userId: user.id, prevDate: user.prevDate});

            let today = new Date;
            let currentdate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
            

            if (user.prevDate != currentdate) {
                await user.update(currentdate)
                await Habit.updateOnNewDay(user.id, user.prevdate, currentdate)
                
            }
        } else {
            throw new Error('User could not be authenticated')
        }
    } catch (err) {
        res.status(401).json( {msg:'Incorrect Username or Password'} );
    }
}


module.exports = { register, login }
