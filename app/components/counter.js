import React from 'react';

export default({
    value,
    onInc,
    onDe
  }) => (
    <div className="myDiv">Hello Electron app that i just changed from ReactDOM with {value.visibilityFilter}!
    Using Electon
    <button id="increment" onClick={onInc}>Up</button>
    <button id="decrement" onClick={onDe}>Down</button>
    </div>
);
