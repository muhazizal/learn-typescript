import { RequestHandler } from 'express'

import { Todo } from '../models/todo'

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
	const text = (
		req.body as {
			text: string
		}
	).text
	const id = Math.random().toString()

	const newTodo = { id, text }

	TODOS.push(newTodo)

	res.status(201).json({
		message: 'Create Todo Success',
		data: newTodo,
	})
}

export const getTodos: RequestHandler = (req, res, next) => {
	return res.status(201).json({
		message: 'Get Todos Success',
		data: TODOS,
	})
}

export const updateTodos: RequestHandler<{ id: string }> = (req, res, next) => {
	const todoId = req.params.id

	const updatedText = (req.body as { text: string }).text

	const todoIndex = TODOS.findIndex((todo) => todo.id === todoId)

	if (todoIndex < 0) {
		throw new Error('Todo Not Found!')
	}

	TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)

	res.json({
		message: 'Update Todo Success',
		data: TODOS[todoIndex],
	})
}

export const deleteTodo: RequestHandler = (req, res, next) => {
	const todoId = req.params.id

	const todoIndex = TODOS.findIndex((todo) => todo.id === todoId)

	if (todoIndex < 0) {
		throw new Error('Todo Not Found!')
	}

	TODOS.splice(todoIndex, 1)

	res.json({
		message: 'Delete Todo Success',
	})
}
