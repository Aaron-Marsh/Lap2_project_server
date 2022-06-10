const User = require('../models/user');

async function index(req, res) {
    try {
        const users = await User.all;
        res.status(200).json({users});
    } catch (err) {
        res.status(500).send(err);
    }
}

async function show(req, res) {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch(err) {
        res.status(404).json({err});
    }
}

async function patch(req, res) {
    try {
        const user = await User.findById(req.body.id);
        const updatedUser = await user.update(req.body.newPrevDate);
        res.json(updatedUser);
    } catch (err) {
        res.status(404).json({err})
    }
}

module.exports = { index, show, patch };
