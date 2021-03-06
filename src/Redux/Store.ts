// // Single Reducer: 

// import { createStore } from "redux";
// import { productsReducer } from "./ProductsState";

// const store = createStore(productsReducer);

// export default store;

// // Redux three operations using single reducer: 
// // 1. Get State: store.getState().products
// // 2. Subscribe: store.subscribe(...)
// // 3. Dispatch: store.dispatch(...)


// -------------------------------------------------------------------------------------------------


// Multiple Reducers: 

import { combineReducers, createStore } from "redux";
import { catsReducer } from "./CatsState";
import { productsReducer } from "./ProductsState";

const reducers = combineReducers({ productsState: productsReducer, catsState: catsReducer });
const store = createStore(reducers);

export default store;

// Redux three operations using multiple reducer:
// 1. Get State: store.getState().productsState.products / store.getState().catsState.cats
// 2. Subscribe: store.subscribe(...)
// 3. Dispatch: store.dispatch(...)

