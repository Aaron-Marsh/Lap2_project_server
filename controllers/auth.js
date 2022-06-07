const bcrypt = require('bcryptjs');

const User = require('../models/user');

async function register(req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.create({...req.body, password: hashed});
        res.status(201).json({msg: 'User created'});
    } catch (err) {
        res.status(500).json({err});
    }
}

async function login(req, res) {
    try {
        const user = await User.findByUsername(req.body.username);
        if(!user){ throw new Error('No user with this username') }
        const authed = bcrypt.compare(req.body.password, user.passwordDigest)
        if (!!authed) {
            res.status(200).json({ username: user.username, userId: user.id, prevDate: user.prevDate});
        } else {
            throw new Error('User could not be authenticated')
        }
    } catch (err) {
        res.status(401).json({ err });
    }
}


module.exports = { register, login }
