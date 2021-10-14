import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { ChakraProvider, Container } from "@chakra-ui/react";

import Page1, { page1_def } from "./pages/Page1";
import Page2, { page2_def } from "./pages/Page2";
import Page3, { page3_def } from "./pages/Page3";
import Page4, { page4_def } from "./pages/Page4";
import Page5, { page5_def } from "./pages/Page5";
import Page6, { page6_def } from "./pages/Page6";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { default as StepFooter } from "./components/footer/Footer";
import { Layout } from "antd";

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
              <Route path="/page4">
                <Page3 />
              </Route>
              <Route path="/page5">
                <Page3 />
              </Route>
              <Route path="/page6">
                <Page6 />
              </Route>
            </Switch>
          </Content>
          <Footer>
            <StepFooter pages={[page1_def, page2_def, page3_def, page4_def, page5_def, page6_def]} />
          </Footer>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
