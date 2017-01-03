import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'


// Redux part

const store = createStore ((state = 0,action) => {
  if (action.type === "inc") {
    return state+1;
  } else if (action.type === "dec") {
    return state-1;
  } else {
    return state;
  }
});

// onClick Methods
const inc = () => {
  store.dispatch({ type:'inc' });
}
const dec = () => {
  store.dispatch({ type:'dec' });
}


// react part

const App = ({ inc,dec,value }) => {
  return (
    <div className="App">
    <h1 className="head">REDUX COUNTER : {value}</h1>
    <button className="btn btn-success inc" onClick={inc}>+</button>
    <button className="btn btn-danger dec" onClick={dec}>-</button>
    </div>
  );
}

// subscribe a render method as a listener to the store.
store.subscribe(() => {
  ReactDOM.render(<App inc={inc} dec={dec} value={store.getState()}/>,document.querySelector(".container"));
});

// call the subscribe once by dispatcing a dummy action

store.dispatch({ type:''});
