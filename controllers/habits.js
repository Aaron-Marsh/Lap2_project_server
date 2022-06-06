const Habit = require('../models/habit');

async function index(req, res) {
    try {
        const habits = await Habit.all;
        res.status(200).json({habits});
    } catch (err) {
        res.status(500).json({err});
    }
}

async function show(req,res) {
    try {
        const habit = await Habit.findById(req.params.id);
        res.json(habit);
    } catch(err) {
        res.status(404).json({err});
    }
}


async function create(req, res) {
    try {
        const habit = await Habit.create(req.body.title, req.body.frequency, req.body.goal, req.body.startdate, req.body.userId);
        res.json(habit);
    } catch(err) {
        res.status(404).json({err});
    }
}

async function destroy(req, res) {
    try {
        const habit = await Habit.findById(req.params.id);
        await habit.destroy();
        res.status(204).json('Habit deleted');
    } catch(err) {
        res.status(500).json({err});
    }
}

module.exports = { index, show, create, destroy };
