import React from 'react';
export const Todo = ({
  onClick,
  completed,
  text
}) => (
  <div className='theirDiv'>
      <li
        onClick={ onClick }
        style={{
          textDecoration:
            completed ?
                'line-through' : 'none'
        }} >
        {text}
      </li>
  </div>
);

export default Todo;
