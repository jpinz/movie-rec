import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import Page1 from "./pages/Page1";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Page2 from "./pages/Page2";

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
    </ChakraProvider>
  );
}

export default App;
