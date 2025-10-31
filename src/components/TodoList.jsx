import { useState } from "react"
import { nanoid } from "nanoid"
import { IoIosClose } from 'react-icons/io';
import { MdDelete } from "react-icons/md";


export default function TodoList({isTodoListShown, setIsTodoListShown}) {
  const [todoArray, setTodoArray] = useState([])
  const [todoInput, setTodoInput] = useState("")

  function addTodo() {
    if (todoInput.trim() === "" || todoArray.some(todo => todo.text === todoInput)) {
      return
    }
    const newTodo = { id: nanoid(), text: todoInput, checked: false }
    setTodoArray(prev => [newTodo, ...prev])

    setTodoInput("")
  }

  function deleteTodo(idToDelete) {
    setTodoArray(prev => prev.filter(todo => todo.id !== idToDelete))
  }

  function toggleTodo(idToToggle) {
    setTodoArray(prev => prev.map(todo => {
      if (todo.id === idToToggle) {
        return {...todo, checked: !todo.checked}
      }
      return todo
    }))
  }

  const todoElements = todoArray.map(todo => (
    <div className="todo" key={todo.id}>
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.checked}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className={todo.checked ? "todo-text strikethrough" : "todo-text"}>{todo.text}</span>
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        <MdDelete style={{width: "18px", height: "18px"}} />
      </button>
    </div>
  ))

  return (
    <div className="todo-list-app" style={!isTodoListShown ? {display: "none"} : {}}>
      <button className="close-btn" onClick={() => setIsTodoListShown(false)}>
        <IoIosClose style={{width: "25px", height: "25px"}} />
      </button>
      
      <p>Todo List</p>

      <div className="add-todo-div">
        <input
          type="text"
          placeholder="Type your todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          onKeyDown={(e) => (e.key==="Enter" && addTodo())}        
        />
        <button className="submit-btn" type="submit" onClick={addTodo} >Add</button>
      </div>

      <div className="todos">
        {todoElements}
      </div>
    </div>
  )
}