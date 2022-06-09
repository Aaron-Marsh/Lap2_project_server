const Habit = require('../models/habit');

async function index(req, res) {
    try {
        const habits = await Habit.all;
        res.status(200).json({habits});
    } catch(err) {
        res.status(500).json({err});
    }
}

async function show(req, res) {
    try {
        const habit = await Habit.findById(req.params.id);
        res.json(habit);
    } catch(err) {
        res.status(404).json({err});
    }
}

async function showUserHabits(req, res) {
    try {
        const habits = await Habit.findByUserId(req.params.userId);
        res.status(200).json({habits});
    } catch(err) {
        res.status(500).json({err})
    }
}


async function create(req, res) {
    try {
        const habit = await Habit.create(req.body.title, req.body.frequency, req.body.goal, req.body.userId);
        res.status(201).json('Habit was created');
    } catch(err) {
        res.status(404).json({err});
    }
}

async function patch(req, res) {
    try {
        const habit = await Habit.findById(req.body.id);
        const updatedHabit = await habit.update(req.body.command);
        res.json(updatedHabit);
    } catch (err) {
        res.status(404).json({err})
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

module.exports = { index, show, showUserHabits, create, patch, destroy };
