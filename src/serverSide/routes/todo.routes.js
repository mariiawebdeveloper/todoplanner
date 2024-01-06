const controller = require("../controllers/todo.controller");

module.exports = function(app) {
    // app.use(function(req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "Origin, Content-Type, Accept"
    //     );
    //     next();
    // });

    app.get('/todos', controller.getAllTodos);

    app.post('/todos', controller.saveTodo);

    app.delete('/todos/:trueId', controller.deleteTodo);

    app.put('/todos/:trueId', controller.editTodo);
};
