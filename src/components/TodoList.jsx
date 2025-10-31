import { useState } from "react"
import { nanoid } from "nanoid"
import { IoIosClose } from 'react-icons/io';


export default function TodoList({isTodoListShown, setIsTodoListShown}) {
  const [todoArray, setTodoArray] = useState([])
  const [todoInput, setTodoInput] = useState("")

  function addTodo() {
    if (todoInput === "" || todoArray.includes(todoInput)) {
      return
    }
    setTodoArray(prev => (
      [todoInput, ...prev]
    ))

    setTodoInput("")
  }

  function deleteTodo(index) {
    setTodoArray(prev => prev.filter((todo, i) => {
      return i !== index
    }))
  }

  const todoElements = todoArray.map((todo, index) => (
    <div className="todo" key={nanoid()}>
      {/* will add todo checkbox later */}
      {/* <input type="checkbox" name="checkbox-todo" id="checkbox-todo" /> */}
      <div>{todo}</div>
      <button className="delete-btn" onClick={() => deleteTodo(index)}>
        <img src="https://img.icons8.com/?size=100&id=87371&format=png&color=ffffff" alt="delete-icon" />
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
          placeholder="Type your Todo"
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