import React from 'react';
export const Group = ({
  onClick,
  name
}) => (
  <div className='urDiv'>
      <li onClick={ onClick } >
        {name}
      </li>
  </div>
);

export default Group;
