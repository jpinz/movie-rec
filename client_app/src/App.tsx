import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { ChakraProvider, Container } from "@chakra-ui/react";

import Page1, { page1_def } from "./pages/Page1";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Page2, { page2_def } from "./pages/Page2";
import { default as StepFooter } from "./components/footer/Footer";
import Page3 from "./pages/Page3";
import { page3_def } from "./pages/Page3";
import { Layout } from "antd";
import Page6 from "./pages/Page6";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Switch>
              <Route exact path="/">
                <Page1 />
              </Route>
              <Route path="/page2">
                <Page2 />
              </Route>
              <Route path="/page3">
                <Page3 />
              </Route>
            </Switch>
          </Content>
          <Footer>
            <StepFooter pages={[page1_def, page2_def, page3_def]} />
          </Footer>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
