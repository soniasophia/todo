import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const ToDoItem = ({ todo, toggleComplete, removeToDo }) => (
  <li>{todo.title}
      <input
         type="checkbox"
         id={todo.id}
         checked={todo.complete} 
         onChange={toggleComplete}/>
      <label htmlFor={todo.id}></label>
      <button onClick={removeToDo}>
         <i className="fa fa-trash"></i>
      </button>
   </li>
);

const ClearButton = ({ removeCompleted }) => (
  <button onClick={removeCompleted}>Clear Completed</button>
);

const ToDoCount = ({ number }) => (
  <p>{number} {number === 1 ? 'todo' : 'todos'}</p>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{ 
        id: 0,
        title: 'Learn React',
        complete: false
       }],

       lastId: 0
    }
  }

  componentDidMount() {
    this.toDoInput.focus();
  }

  toggleComplete = (item) => {
    const newTodos = this.state.todos.map(todo => {
      if ( item.id === todo.id ) {
        todo.complete = !todo.complete
      }

      return todo;
    });

    this.setState({ todos: newTodos });
  }

  removeToDo = (item) => {
    const newTodos = this.state.todos.filter(todo => todo.id !== item.id);
    this.setState({ todos: newTodos });
  }

  removeCompleted = () => {
   let newTodos = this.state.todos.filter((todo) => !todo.complete);
   this.setState({ todos: newTodos });
}

  hasCompleted() {
    const completed = this.state.todos.filter((todo) => todo.complete);
    return completed.length > 0 ? true : false;
  }

  addToDo = (event) => {
    event.preventDefault();

    const id = this.state.lastId + 1;

    if(this.toDoInput.value) {
      const newTodos = this.state.todos.concat({
        id: id,
        title: this.toDoInput.value,
        complete: false
      });
      this.setState({ todos: newTodos, lastId: id });

      this.toDoInput.value = '';
    }
  }


  render() {
    const { todos } = this.state;

    return (
      <div className="todo-list">
        <h1>So Much To Do</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            <input type="text" ref={(input) => (this.toDoInput = input)} />
            <span>(press enter to add)</span>
          </form>
        </div>
        <ul>
        {todos.map((todo, index) => (
          <ToDoItem 
          key={index} 
          todo={todo} 
          toggleComplete={() => this.toggleComplete(todo)}
          removeToDo={() => this.removeToDo(todo)} 
          />
          ))}
        </ul>

        <div className="todo-admin">
          <ToDoCount number={todos.length} />
          { this.hasCompleted() && <ClearButton removeCompleted={this.removeCompleted} /> }
        </div>
      </div>
    );
  }
}

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
}

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
}

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    complete: PropTypes.bool
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeToDo: PropTypes.func.isRequired
}

export default App;
