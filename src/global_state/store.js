import { createStore } from 'redux';
import { accessReducer } from './reducers';

const store = createStore(accessReducer, {accessToken:""});

export default store;