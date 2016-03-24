import React from 'react';
export default ({
  onClick,
  name
}) => (
  <div className='urDiv'>
      <li onClick={ onClick } >
        {name}
      </li>
  </div>
);
