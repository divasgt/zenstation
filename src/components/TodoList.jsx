import {useState} from "react"
import { nanoid } from "nanoid"

export default function TodoList({isTodoListShown}) {
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