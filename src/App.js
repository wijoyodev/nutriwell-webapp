import React from "react";
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from './store'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteHandler from './RouteHandler'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <RouteHandler/>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
