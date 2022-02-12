"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodos = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const id = Math.random().toString();
    const newTodo = { id, text };
    TODOS.push(newTodo);
    res.status(201).json({
        message: 'Create Todo Success',
        data: newTodo,
    });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    return res.status(201).json({
        message: 'Get Todos Success',
        data: TODOS,
    });
};
exports.getTodos = getTodos;
const updateTodos = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Todo Not Found!');
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({
        message: 'Update Todo Success',
        data: TODOS[todoIndex],
    });
};
exports.updateTodos = updateTodos;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Todo Not Found!');
    }
    TODOS.splice(todoIndex, 1);
    res.json({
        message: 'Delete Todo Success',
    });
};
exports.deleteTodo = deleteTodo;
