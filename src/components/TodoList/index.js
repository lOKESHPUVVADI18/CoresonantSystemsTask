import TodoItem from '../TodoItem'

function TodoList({
  todos,
  toggleCompletion,
  editTask,
  deleteTask,
  showCompleted,
}) {
  const filteredTodos = showCompleted
    ? todos.filter(todo => todo.completed)
    : todos

  return (
    <ul>
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompletion={toggleCompletion}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  )
}

export default TodoList
