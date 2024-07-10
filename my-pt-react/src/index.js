// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage';
import User1 from './components/User1';
import User2 from './components/User2';
import TermsConditions from './components/TermsConditions'
import Timer from './components/Timer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

const rootElement = document.getElementById('root');
const user1Element = document.getElementById('user1');
const user2Element = document.getElementById('user2');
const TCElement = document.getElementById('TC')
const timerElement = document.getElementById('timer')

const RootApp = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainPage} />
    </Switch>
  </BrowserRouter>
);

const User1App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/User1" component={User1} />
    </Switch>
  </BrowserRouter>
);

const User2App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/User2" component={User2} />
    </Switch>
  </BrowserRouter>
);

const TermsConditionsApp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/TermsConditions" component={TermsConditions} />
    </Switch>
  </BrowserRouter>
);

const TimerApp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/Timer" component={Timer} />
    </Switch>
  </BrowserRouter>
);

if (rootElement) {
  ReactDOM.render(<RootApp />, rootElement);
}

if (user1Element) {
  ReactDOM.render(<User1App />, user1Element);
}

if (user2Element) {
  ReactDOM.render(<User2App />, user2Element);
}

if (TCElement) {
  ReactDOM.render(<TermsConditionsApp />, TCElement);
}

if (timerElement) {
  ReactDOM.render(<TimerApp />, timerElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals.console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
