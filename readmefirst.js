/********************************************************************************************************
    _____   ____________  ____  ____  __  ______________________  _   __
   /  _/ | / /_  __/ __ \/ __ \/ __ \/ / / / ____/_  __/  _/ __ \/ | / /
   / //  |/ / / / / /_/ / / / / / / / / / / /     / /  / // / / /  |/ / 
 _/ // /|  / / / / _, _/ /_/ / /_/ / /_/ / /___  / / _/ // /_/ / /|  /  
/___/_/ |_/ /_/ /_/ |_|\____/_____/\____/\____/ /_/ /___/\____/_/ |_/   
  __________         ____  __________  __  ___  __
 /_  __/ __ \       / __ \/ ____/ __ \/ / / / |/ /
  / / / / / /      / /_/ / __/ / / / / / / /|   / 
 / / / /_/ /      / _, _/ /___/ /_/ / /_/ //   |  
/_/  \____/      /_/ |_/_____/_____/\____//_/|_|  
********************************************************************************************************/
// -< NOTE : Prior knowledge of react is assumed >- 

/*

An application is composed of two blocks, irrespective framework used to build it.
1. State of the application
2. Views or the UI components (and their behaviour) in the application
These two blocks put together define an application, its behaviour and state at any given point of time. Redux works with any front end framework but works best with react. 

 _____________  __  ________  ______  __   ____  _______  __
/_  __/ __/ _ \/  |/  /  _/ |/ / __ \/ /  / __ \/ ___/\ \/ /
 / / / _// , _/ /|_/ // //    / /_/ / /__/ /_/ / (_ /  \  / 
/_/ /___/_/|_/_/  /_/___/_/|_/\____/____/\____/\___/   /_/
Some things you want to remember about redux:

1. A view or a component is a piece of ui in the app according to react. In redux-react ecosystem, were going to call it a smart comonent or a container. In order for a component or a view to be "reduxed" we have to promote it to a container.

2. A store is one big object in the application that contains the state of the entire application in it. The application's components/containers are stateless according to react and the store is just plugged in to the components as props. This store is immutable. Every time a change is needed, a new object with modified data is returned.
also; flux contains many stores but redux contains only one store

3. An action is an simple javascript object in redux which is priduced when a user or any other event produces a need for a change in the state of the application. It is an object in which one of its key must be 'type'. for exmaple { type:'BUTTON_PRESS',key:'value',something:'somethingelse'}. The data in a store must only be mutated by responding to an action. All actions are created by some sort of interaction with views and components or external events by talking to an action creator

4. A Reducer is a pure function (function which does not mutate the argument and only returns something based of the argument. It performs no other processing at all) that takes a previous state, an action and produces a new state (or a store). There can be many reducers in an application each catering to its own portion of the store.

5. A dispatcher is sort of a function in redux that receives an action event from an action creator and dispatches this action to all reducers in the application (or all reducers that are regitered with the dispatcher). Every reducer in the application receives the action but only the reducers that actually deals the portion of the state affected the action responds or works

   ___  ___ _________      ______   ____ _      __
  / _ \/ _ /_  __/ _ |    / __/ /  / __ \ | /| / /
 / // / __ |/ / / __ |   / _// /__/ /_/ / |/ |/ / 
/____/_/ |_/_/ /_/ |_|  /_/ /____/\____/|__/|__/  
Let's explore an example of how react-redux ecosystem works and how the data flows in an application. Let's build a simple counter which contains a number view which defaults to showing a '0' and two buttons namely increment and decrement. The buttons either increment or decrement a counter when they are clicked respectively.

Basic flow:
1. The application is composed with stateless containers/components and the state and redux api is called that passes the state/store to the container in the form of props
2. A user interacion with a container/component or an event uses the action creator to create an action.
3. A dispatcher then receives this action from an action creator and dispatches this event to all reducers registered with it.
4. Appropriate reducers are triggered and make their changes to the state(store).
5. The store emits an appropriate 'changed' event to which the subscribed containers/components re render themselves

*/


/*
   ___  _______  __  ______________  ____
  / _ \/ __/ _ \/ / / / ___/ __/ _ \/ __/
 / , _/ _// // / /_/ / /__/ _// , _/\ \  
/_/|_/___/____/\____/\___/___/_/|_/___/  
                                         
*/                                             


// We will try to model how a reducer should look like for this application
const expect = require('expect');
// it takes current state and action and returns a new instance of the updated state 
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INC':
      return state+1;
    case 'DEC':
      return state-1;
    default:
      return state;
  }
}

// some test functions to see how this works
expect (counterReducer (1,{ type:'INC' })).toEqual(2);
expect (counterReducer (1,{ type:'DEC' })).toEqual(0);
expect (counterReducer (-1,{ type:'INC' })).toEqual(0);
expect (counterReducer (0,{ type:'DEC' })).toEqual(-1);
expect (counterReducer (0,{ type:'inc' })).toEqual(0);
console.log('all tests passed');


/*
   ______________  ___  ____
  / __/_  __/ __ \/ _ \/ __/
 _\ \  / / / /_/ / , _/ _/  
/___/ /_/  \____/_/|_/___/  
                            
*/

// now let's try to interface with the store object in redux
const { createStore } = require('redux');
// we create a new store using the api below. We pass a reducer to it as a reducer tells us how the state should be modified upon receiving an action
// Store contains application state. All reducers passed to it are 'registered' to the store
const store = createStore(counterReducer);

/*
Store has three methods attached to it
1 -> store.getState() gets the state of the application from the store.
2 -> store.dispatch() dispatches action passed to it to all reducers registered to the store.
3 -> store.subscribe() invokes the function (more appropriately called a listener) passed to it whenever a dispatch call has been processed.

***official documentation for subscribe()***
Adds a change listener. It will be called any time an action is dispatched, and some part of the state tree may potentially have changed. You may then call getState() to read the current state tree inside the callback.

IMPORTANT : To unsubscribe the change listener, invoke the function returned by subscribe.


*/

console.log(store.getState()); // => 0
store.dispatch({ type:'INC' }); // dispatch an action
console.log(store.getState()); // => 1
store.dispatch({ type:'INC' });
store.dispatch({ type:'INC' });
console.log(store.getState()); // => 3
store.dispatch({ type:'DEC' });
console.log(store.getState()); // => 2

// we can use subscribe method to do something everytime a dispatcher is processed
store.subscribe (() => {
  console.log('A dispatch is received and processed by the registered reducer');
});

store.dispatch({ type:'DEC' });
store.dispatch({ type:'DEC' });
store.dispatch({ type:'DEC' });
console.log(store.getState());
// the three statements above force store to print 'A dispatch is received and processed by the registered reducer'


// Let's now try to implement our own version of redux's createStore function to have a better understanding of things under the hood. We need to 
const myCreateStore = (reducer) => {
  let state;
  let listeners = [];
  const getState = () => {
    return state;
  }
  const dispatch = (action) => {
    reducer(state,action);
    listeners.forEach( listener => listener() );
  }
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter( (l) => l !== listener )
    }
  }

  dispatch({}); // a dummy dispatch just to instantiate the state

  return { getState,dispatch,subscribe };
}

const newStore = myCreateStore(counterReducer);

newStore.dispatch({ type:'INC' });
newStore.dispatch({ type:'INC' });
newStore.subscribe( () => console.log('dispatched!') );
newStore.dispatch({ type:'DEC' });
console.log(`The state of newStore is ${store.getState()}`);