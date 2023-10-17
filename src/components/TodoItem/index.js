import {useState} from 'react'

function TodoItem({todo, toggleCompletion, editTask, deleteTask}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(todo.title)

  const handleEdit = () => {
    if (editedTask.trim() !== '') {
      editTask(todo.id, editedTask)
      setIsEditing(false)
    }
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={e => setEditedTask(e.target.value)}
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span onClick={() => toggleCompletion(todo.id)}>{todo.title}</span>
      )}
      {isEditing ? (
        <button onClick={handleEdit} type="button">
          Save
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} type="button">
          Edit
        </button>
      )}
      <button onClick={() => deleteTask(todo.id)} type="button">
        Delete
      </button>
    </li>
  )
}

export default TodoItem
