const Habit = require('../models/habit');

async function index(req, res) {
    try {
        const habits = await Habit.all;
        res.status(200).json({habits});
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { index };
