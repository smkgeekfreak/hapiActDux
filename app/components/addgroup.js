import React from 'react';
export default ({ onAddClick}) => {
    let input;
    return (
      <div>
      <input ref={ node => {
        input = node;
      }} />
      <button onClick={()=> {
        onAddClick(input.value)
        input.value='';
      }}>
        Add Group
      </button>
      </div>
    );
};
