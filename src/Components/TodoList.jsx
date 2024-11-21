import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);  // Array of 'todo' objects --> {heading: headingInput, lists: []}
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  const handleAddTodo = () => {
    if(headingInput.trim() !== '') {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      setHeadingInput('');
    }
  };

  const handleAddList = (index) => {
    if(listInputs[index] && listInputs[index].trim() !== '') {
      const newTodos = [...todos];
      newTodos[index].lists.push(listInputs[index]);
      setTodos(newTodos);
      setListInputs({ ...listInputs, [index]: '' });
    }
  };

  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value });
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading" 
            value={headingInput} // binds the value of the 'input' field to the 'headingInput' state variable
            onChange={(e) => {setHeadingInput(e.target.value);}} // Add onChange event handler to update headingInput state
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      
      
      <div className="todo_main">
        {/* Iterate over the todos array and display the heading of each todo item */}
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            
            {/* Heading */}
            <div className="heading_todo">
              <h3>{todo.heading}</h3> 
              <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading </button>
            </div>

            {/* Individual lists inside the heading */}
            <div className='add_list'>
              <ul>
                {todo.lists.map((list, listIndex) => (
                  <li key={listIndex} className='todo_inside_list'>
                    <p>{list}</p>
                  </li>
                ))}
              </ul> 
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ''}
                onChange={(e) => handleListInputChange(index, e.target.value)}
              />
              <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button> 
            </div>
            
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
