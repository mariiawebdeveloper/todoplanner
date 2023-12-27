const Todo = require('../models/todo.model');

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.saveTodo = async (req, res) => {
    const { title, status, deadline } = req.body;

    try {
        const lastTodo = await Todo.findOne({}, {}, { sort: { trueId: -1 } });

        const todos = await Todo.find();

        const newTodo = new Todo({
            trueId: lastTodo ? lastTodo.trueId + 1 : 1,
            title,
            status,
            order: todos.length + 1,
            deadline,
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteTodo = async (req, res) => {
    const trueId = req.params.trueId;

    try {
        const deletedTodo = await Todo.findOneAndDelete({ trueId: trueId });

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json(deletedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.editTodo = async (req, res) => {
    const trueId = req.params.trueId;
    const { title, status, order, deadline } = req.body;

    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            {trueId: trueId},
            {
                title,
                status,
                order,
                deadline,
            },
            { new: true }
        );

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
