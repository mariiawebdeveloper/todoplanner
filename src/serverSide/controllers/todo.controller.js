const Todo = require('../models/todo.model');

exports.getAllTodos = async (req, res) => {
    console.log('mmmyyyyaw1', Todo)
    try {
        const { username } = req.query;
        const todos = await Todo.find({ username }).exec();
        console.log('mmmyyyyaw2', todos)
        console.log('mmmyyyyaw3', req)

        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.saveTodo = async (req, res) => {

    const { title, status, deadline } = req.body;

    try {
        console.log(req.body, 'UWU')
        const lastTodo = await Todo.findOne({}, {}, { sort: { trueId: -1 } });

        const todos = await Todo.find();

        const newTodo = new Todo({
            trueId: lastTodo ? lastTodo.trueId + 1 : 1,
            title,
            status:'to do',
            order: todos.length + 1,
            deadline,
            username: req.body.username
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
    const { trueId, title, status, order, deadline, username } = req.body;

    try {
        console.log(trueId,'true Id')
        console.log(req.body,'BoDy')
        const updatedTodo = await Todo.findOneAndUpdate(
            {trueId: trueId},
            {
                title,
                status,
                order,
                deadline,
                username
            }
        );

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
