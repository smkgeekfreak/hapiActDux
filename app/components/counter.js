import React from 'react';

export default({
    value,
    onInc,
    onDe
  }) => (
    <div className="myDiv">Hello Electron app that i just changed from ReactDOM with {value.visibilityFilter}!
    Using Electon
    <button onClick={onInc}>Up</button>
    <button onClick={onDe}>Down</button>
    </div>
);
