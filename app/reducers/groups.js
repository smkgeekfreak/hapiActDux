import { ADD_GROUP, RENAME_GROUP, REMOVE_GROUP, ACTIVATE_GROUP,LOAD_GROUPS } from '../actions/actions'


function group(state, action ) {
  switch (action.type) {
      // )
    case 'SYNC':
      console.log('SYNC')
      return {
        ...state,
        name: action.name,
        status: 'SYNCED'
      }
    case ADD_GROUP:
      return {
        ...state,
        name: action.name,
        status: 'PENDING'
      }
    case RENAME_GROUP:
      if(state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        name: action.name
      }
    case ACTIVATE_GROUP:
      console.log('state name %s, action name %s', state.name, action.name)
      if(state.name !== action.name) {
        return state;
      }
      return {
        ...state,
        id: action.id,
        status: 'ACTIVE'
      }
  }
}

export function groups(state = [], action) {
  // console.log('action =' + action.id);
  switch (action.type) {
    case LOAD_GROUPS:
      console.log("load me ", action.json)
      // return state
      // return action.json.map(g =>
      let newState = action.json.map(function(j){
          // let jet = JSON.parse(j);
          console.log(j);
          return {createdAt:j.createdAt,id:j.id,name:j.name,status:'SYNCD'}
        })
      return newState;

    case ADD_GROUP:
      if(!action.name) {
        return state;
      }
      let match = state.find(function(f){return f.name===action.name});
      console.log("match = ", match)
      if(!match){
      return [
        ...state,
        group({
          id:state.reduce((maxId, group) => Math.max(group.id, maxId), -1) + 1
        }, action)
      ]
    }
    return state;
    case RENAME_GROUP:
      return state.map(g =>
        group(g, action)
      )
    case REMOVE_GROUP:
      // console.log('state =' + JSON.stringify(state));
      // let index = findIndexById(state,  action.id)
      let index = state.map(function(e) { return e.id; }).indexOf(action.id);
      // console.log('index =' + index);
      if(typeof index !== 'undefined') // where not undefined or id=0 which is also falsy
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
      return state;
    case ACTIVATE_GROUP:
        console.log('activating state =' + JSON.stringify(state));
        return state.map(g =>
          group(g, action)
        )
    default:
      return state
  }
}

export default groups
// function findIndexById(state=[], value) {
//   // console.log("found =" + value)
//     for (var i = 0, len = state.length; i < len; i++) {
//       // console.log("val = " + JSON.stringify(state[i]))
//       if (state[i].id == value) {
//         return i;
//       }
//     }
// }
