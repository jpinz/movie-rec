import React from 'react';
import './App.css';
import Page1 from './pages/Page1';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Page2 from './pages/Page2';

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/page2">Page2</Link>
      </div>

      <hr />

      <Switch>
        <Route exact path="/">
          <Page1 />
        </Route>
        <Route path="/page2">
          <Page2 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
