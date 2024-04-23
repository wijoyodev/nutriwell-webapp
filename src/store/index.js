import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from "./reducers"

// create a makeStore function
const store = createStore(reducer, applyMiddleware(thunk))

// export an assembled wrapper
export default store;
