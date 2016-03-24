import React, { PropTypes } from 'react';
import Todo from './todo'
const TodoList = ( props, onTodoClick ) => (
  <div className='theirDiv'>
  <ul>
    {props.todos.map( todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => props.onTodoClick(todo.id)}
      />
    )}
  </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
