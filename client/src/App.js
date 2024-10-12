import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import ProductCatalog from './components/ProductCatalog';
import ChestSlider from './components/ChestSlider';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';

const AppWrapper = styled.div`
  background-color: #0066cc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Router>
      <AppWrapper>
        <Header />
        <Switch>
          <Route exact path="/" component={ProductCatalog} />
          <Route path="/chests" component={ChestSlider} />
          <Route path="/auth" component={Auth} />
          <Route path="/admin" component={AdminPanel} />
        </Switch>
      </AppWrapper>
    </Router>
  );
}

export default App;
