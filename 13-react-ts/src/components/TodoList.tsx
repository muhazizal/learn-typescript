import React from 'react'

import '../styles/TodoList.css'

interface TodoListProps {
	items: { id: string; task: string }[]
	onDeleteTodo: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = (props) => {
	return (
		<ul>
			{props.items.map((item) => (
				<div>
					<li key={item.id}>{item.task}</li>
					<button onClick={props.onDeleteTodo.bind(null, item.id)}>
						DELETE
					</button>
				</div>
			))}
		</ul>
	)
}

export default TodoList
