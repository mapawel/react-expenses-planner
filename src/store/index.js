import { createStore } from 'redux';
import rootReducer from 'reducers/rootReducer';
import { loadState, saveState } from 'localStorage';

const persistedState = loadState();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
