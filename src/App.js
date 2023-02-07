import React, { useState } from "react";
import "./App.css";
function Todo() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);

  const handleClick = () => {
    setTodo([...todo, input]);
    setInput("");
  };

  const handleCheckbox = (item) => {
    setTodo(todo.filter((el) => el !== item));
    setDone([...done, item]);
  };

  return (
    <div className="container">
      <div className="array">
        <h3>TODO</h3>
        <label htmlFor="todoInput">Todo Input:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="todoInput"
        />
        <button onClick={handleClick}  >Enter</button>
        {todo.map((item, index) => (
          <div key={index} className="item">
            <input type="checkbox" role="checkbox" onChange={() => handleCheckbox(item)} />
            {item}
          </div>
        ))}
      </div>
      <div className="array">
        <h3>DONE</h3>
        {done.map((item, index) => (
          <div className="item" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
