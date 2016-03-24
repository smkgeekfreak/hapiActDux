import React from 'react';
export default ({ onShowAll,onShowActive,onShowCompleted }) => (
  <div>
  <button onClick={onShowAll}>All</button>
  <button onClick={onShowActive}>Active</button>
  <button onClick={onShowCompleted}>Completed</button>
  </div>
);
