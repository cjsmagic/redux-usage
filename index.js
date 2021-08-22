import { createStore, applyMiddleware } from 'redux';
import './style.css';

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      console.log('received');
      return { value: state.value + 1 };
    case 'counter/decremented':
      console.log('received dec');
      return { value: state.value - 1 };
    default:
      return state;
  }
}

function logger(deps) {
  console.log(deps);
  const { getState, dispatch } = deps;
  return next => action => {
    console.log('will dispatch', action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log('state after dispatch', getState());
    // dispatch({ type: 'counter/decremented' });
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

const store = createStore(counterReducer, applyMiddleware(logger));

const renderCounter = () => {
  const counterElement = document.getElementById('counter');
  const state = store.getState();
  counterElement.innerText = state.value;
};
renderCounter();
store.subscribe(renderCounter);

const incr = () => {
  return { type: 'counter/incremented' };
};

document.getElementById('add').addEventListener('click', () => {
  store.dispatch(incr());
});

document.getElementById('subtract').addEventListener('click', () => {
  store.dispatch({ type: 'counter/decremented' });
});
