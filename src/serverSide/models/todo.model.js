const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Todo = mongoose.model(
    "Todo",
    new mongoose.Schema({
        id: {
            type: String,
            default: uuidv4,
            required: true,
            unique: true,
        },
        trueId: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    })
);

module.exports = Todo;
