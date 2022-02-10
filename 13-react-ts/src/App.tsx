import React, { useState } from 'react'

import NewTodo from './components/NewTodo'
import TodoList from './components/TodoList'

import { Todo } from './models/todo.model'

function App() {
	const [todos, setTodos] = useState<Todo[]>([])

	const onAddTodo = (task: string) => {
		setTodos((prevTodos) => [
			...prevTodos,
			{ id: Math.random().toString(), task },
		])
	}

	const onDeleteTodo = (taskId: string) => {
		setTodos((prevTodos) => {
			return prevTodos.filter((todo) => todo.id !== taskId)
		})
	}

	return (
		<div className='App'>
			<NewTodo onAddTodo={onAddTodo} />
			<TodoList items={todos} onDeleteTodo={onDeleteTodo} />
		</div>
	)
}

export default App
