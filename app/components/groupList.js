import React from 'react';
import Group from "./group";
export default ( props, onGroupClick ) => (
  <div className='urDiv'>
  <ul>
    {props.groups.map( group =>
      <Group key={group.id}
        {...group}
        onClick={() => props.onGroupClick(group.id)}
      />
    )}
  </ul>
  </div>
);
