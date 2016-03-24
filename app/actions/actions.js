/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const ADD_GROUP = 'ADD_GROUP'
export const RENAME_GROUP = 'RENAME_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const ACTIVATE_GROUP= 'ACTIVATE_GROUP'
export const LOAD_GROUPS= 'LOAD_GROUPS'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_PENDING: 'SHOW_PENDING'
}

/*
 * action creators
 */

export function addGroupOptimistic(name) {
  return { type: ADD_GROUP, name}
}

export function removeGroup(id) {
  return { type: REMOVE_GROUP, id}
}

export function activateGroup(id,name) {
  return { type: ACTIVATE_GROUP,id, name}
}
export function receivedGroups(json) {
  return { type: LOAD_GROUPS, json }
}


// export function addTodo(text) {
//   return { type: ADD_TODO, text }
// }

export function completeTodo(id) {
  return { type: COMPLETE_TODO, id}
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

// renamed optimistic action creator - this won't be called directly
// by the React components anymore, but from our async thunk function
export function addTodoOptimistic(text) {
  return { type: ADD_TODO, text };
}

// the async action creator uses the name of the old action creator, so
// it will get called by the existing code when a new todo item should
//  be added
export function addTodo(text) {
  // we return a thunk function, not an action object!
  // the thunk function needs to dispatch some actions to change
  // the Store status, so it receives the "dispatch" function as its
  // >first parameter

  return function(dispatch) {
    // here starts the code that actually gets executed when the
    //  addTodo action creator is dispatched

    // first of all, let's do the optimistic UI update - we need to
    // dispatch the old synchronous action object, using the renamed
    // action creator

    // now that the Store has been notified of the new todo item, we
    // should also notify our server - we'll use here ES6 fetch
    // function to post the data
    fetch('http://192.168.99.100:9080/crud', {
      method: 'post',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sample: text
      })
    }).then(response => {
      // you should probably get a real id for your new todo item here,
      // and update your store, but we'll leave that to you
      console.log(response);
      dispatch(addTodoOptimistic(text));
    }).catch(err => {
    // Error: handle it the way you like, undoing the optimistic update,
    //  showing a "out of sync" message, etc.
    console.log(err);
    });
  // what you return here gets returned by the dispatch function that
  // used this action creator
  return null;
  }
}

export function addGroup(name) {
  return function(dispatch) {
    //
    let g = dispatch(addGroupOptimistic(name));
    console.log("new group:" + JSON.stringify(g))
    //
    fetch('http://192.168.99.100:10001/crud', {
      method: 'post',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    }).then(response => {
      console.log(response);
      return response.json()
    }).then(json => {
      // you should probably get a real id for your new todo item here,
      // and update your store, but we'll leave that to you
      console.log("return body ",json);
      dispatch(activateGroup(json.id,json.name));
    }).catch(err => {
    // Error: handle it the way you like, undoing the optimistic update,
    //  showing a "out of sync" message, etc.
    console.log(err);
    });
  // what you return here gets returned by the dispatch function that
  // used this action creator
  return null;
  }
}

export function loadGroups() {
  return function(dispatch) {
    //
    fetch('http://192.168.99.100:10001/crud/all', {
      method: 'get',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response);
      return response.json()
    }).then(json => {
      // you should probably get a real id for your new todo item here,
      // and update your store, but we'll leave that to you
      console.log("return body= ",json);
      dispatch(receivedGroups(json));
      //dispatch(activateGroup(json.uid,name));
    }).catch(err => {
    // Error: handle it the way you like, undoing the optimistic update,
    //  showing a "out of sync" message, etc.
      console.log(err);
    });
  // what you return here gets returned by the dispatch function that
  // used this action creator
  return null;
  }
}
