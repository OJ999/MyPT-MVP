import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../components/MainPage';
import HomePage from '../components/HomePage';
import TermsConditions from '../components/TermsConditions';
import Timer from '../components/Timer';

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/HomePage" component={HomePage} />
        <Route path="/TermsConditions" component={TermsConditions} />
        <Route path="/Timer" component={Timer} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
