import React from "react";
import "./App.css";
import 'antd/dist/antd.css';
import { ChakraProvider } from "@chakra-ui/react";

import Page1, { page1_def } from "./pages/Page1";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Page2, { page2_def } from "./pages/Page2";
import Footer from "./components/footer/Footer";

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
        <Footer pages={[page1_def, page2_def]}/>
      </Router>
    </ChakraProvider>
  );
}

export default App;
