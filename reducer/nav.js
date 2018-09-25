// import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { RootNavigator } from '../navigation/AppNavigation.js';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = RootNavigator.router.getActionForPathAndParams('Home');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
const secondAction = RootNavigator.router.getActionForPathAndParams('Login');
const initialNavState = RootNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

export default function reducer(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      console.log('Login',nextState)
      console.log('Login-nav',action)
      break;
    case 'Logout':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      console.log('Logout',nextState)
      break;
      case 'Home':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
export function logout(){
    return dispatch => {
        dispatch({ type: 'Logout' });
      }; 
}
export function login(){
    return dispatch => {
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      }; 
}