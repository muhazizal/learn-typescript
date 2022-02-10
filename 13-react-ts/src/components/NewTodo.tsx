import React from 'react'
import { useRef } from 'react'

import '../styles/NewTodo.css'

type NewTodoProps = {
	onAddTodo: (task: string) => void
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
	const taskInput = useRef<HTMLInputElement>(null)

	const onSubmitAddTodo = (evt: React.FormEvent) => {
		evt.preventDefault()
		const enteredTask = taskInput.current!.value
		props.onAddTodo(enteredTask)
	}

	return (
		<form onSubmit={onSubmitAddTodo}>
			<div className='form-control'>
				<label htmlFor='todo-task'></label>
				<input type='text' id='todo-task' ref={taskInput} />
			</div>
			<button type='submit'>ADD TODO</button>
		</form>
	)
}

export default NewTodo
