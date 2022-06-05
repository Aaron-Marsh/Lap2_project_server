const Habit = require('../models/habit');

async function index(req, res) {
    try {
        const users = await Habit.all;
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { index };
