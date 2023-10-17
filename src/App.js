import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)

  // Load todos from local storage on initial render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: uuidv4(),
        title: newTask,
        completed: false,
      }
      const updatedTodos = [...todos, newTodo]
      setTodos(updatedTodos)
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      setNewTask('')
    }
  }

  const toggleCompletion = id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    )
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  const editTask = (id, newTitle) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? {...todo, title: newTitle} : todo,
    )
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  const deleteTask = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={addTask} type="button">
        Add
      </button>
      <div>
        <input
          type="checkbox"
          id="show-completed"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
        <label htmlFor="show-completed">Show Completed Tasks</label>
      </div>
      <TodoList
        todos={todos}
        toggleCompletion={toggleCompletion}
        editTask={editTask}
        deleteTask={deleteTask}
        showCompleted={showCompleted}
      />
    </div>
  )
}

export default App
