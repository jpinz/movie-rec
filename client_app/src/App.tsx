import React from "react";
import "./App.css";
import 'antd/dist/antd.css';
import { ChakraProvider } from "@chakra-ui/react";

import Page1 from "./pages/Page1";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Page2 from "./pages/Page2";
import Page6 from "./pages/Page6";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/page2">Page2</Link>
        </div>
        <div>
          <Link to="/page6">Page6</Link>
        </div>

        <hr />

        <Switch>
          <Route exact path="/">
            <Page1 />
          </Route>
          <Route path="/page2">
            <Page2 />
          </Route>
          <Route path="/page6">
            <Page6 />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
