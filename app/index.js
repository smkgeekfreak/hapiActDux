
require('../less/main.less');
'use strict';
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import SplitPane from 'react-split-pane';
// import { Block, Flex } from 'jsxstyle';
import Text from "./components/text";
import Counter from "./components/counter";
import TodoList from "./components/todoList";
import GroupList from "./components/groupList";
import AddTodoPres from "./components/addtodo";
import AddGroupPres from "./components/addgroup";
import Griddle from 'griddle-react';
import { Provider } from 'react-redux';
// import DevTools from './components/DevTools';
import {addGroup, removeGroup, loadGroups, addTodo, completeTodo, setVisibilityFilter,VisibilityFilters} from './actions/actions'

import {countUp, countDown} from './actions/counterActions'
import VisFilter from "./components/visFilter"

import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

function createLogger({ getState }) {
  return (next) =>
    (action) => {
      const console = window.console;
      const prevState = getState();
      const returnValue = next(action);
      const nextState = getState();
      const actionType = String(action.type);
      const message = `action ${actionType}`;
      console.log(`%c prev state`, `color: #FF7E9E`, prevState);
      console.log(`%c action`, `color: #03A9F4`, action);
      console.log(`%c next state`, `color: #5CAF50`, nextState);
      return returnValue;
    };
}
const createStoreWithMiddleware =
  applyMiddleware(createLogger,thunk)(createStore);

function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
const store = configureStore();

function getFilterTodos(todos,filter) {
  switch(filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t=>t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t=>!t.completed);
    default:
      return todos;
    }
  }
// const Fonts = ({ children }) =>
//   <Block fontFamily='Helvetica, Arial, sans-serif'>
//   {children}
//   </Block>;

// const Center = ({ children }) =>
//   <Flex alignItems='center'
//         justifyContent='center'
//         flexWrap='wrap'
//         >
//     {children}
//   </Flex>;

  // const Application = () => (
class Application extends React.Component {
  componentDidMount() {
    store.dispatch(loadGroups())
  }

  render() {
    return (

      <div className="myDiv">
        <SplitPane split="vertical" minSize="175" defaultSize="200">
          <div className="urDiv">
            <h1>This is longer</h1>
            <Text value="try to improve"/>
            <Text value="test and measure"/>
            <Text value={store.getState().counter}/>
            <AddTodoPres
              onAddClick={ text=> store.dispatch(addTodo(text)) }
            />
          </div>

          <SplitPane split="horizontal" minSize="100" defaultSize="500">
                <div>
                  <Griddle results={store.getState().groups}/>
                  <TodoList todos={getFilterTodos(store.getState().todos,store.getState().visibilityFilter)}
                      onTodoClick={id => store.dispatch(completeTodo(id))}
                  />
                <div>
                  <AddGroupPres
                    onAddClick={name => store.dispatch(addGroup(name))}
                  />
                  <GroupList groups={store.getState().groups}
                    onGroupClick={id => store.dispatch(removeGroup(id))}
                  />
                </div>
                <div>
                  <Counter value={store.getState()}
                    onInc={() => store.dispatch(countUp())}
                    onDe={() => store.dispatch(countDown())}
                  />
                </div>
                </div>
                <VisFilter
                  onShowAll={() =>
                    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL)) }
                  onShowActive={() =>
                   store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE)) }
                  onShowCompleted={() =>
                   store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED)) }
                />
          </SplitPane>
        </SplitPane>
      </div>
    )};
  }

// const store = createStore(todoApp);

const render = () => {
  ReactDOM.render(
    <div>
    <Provider store={store}>
      <Application />
    </Provider>
    </div>,
    document.getElementById("root"));
  };

store.subscribe(render);
render();
// store.dispatch(addTodo("combinded todo"))
// store.dispatch(addTodo("second todo"))
// store.dispatch(addGroup("My Group"))
// store.dispatch(addGroup("2nd Group"))

// import showMyDevTools from './showDevTools';
// if (process.env.NODE_ENV !== 'production') {
//   showMyDevTools(store);
// }
