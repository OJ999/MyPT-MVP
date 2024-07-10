/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "../components/MainPage";
import User1 from "../components/User1";
import User2 from "../components/User2";
import TermsConditions from "../components/TermsConditions";
import Timer from "../components/Timer";

function MainRouter() {
  return(
  <BrowserRouter>
    <Switch>
    {<Route path="/" component={MainPage}></Route>}
    {<Route path="/User1" component={User1}></Route>}
    {<Route path="/User2" component={User2}></Route>}
    {<Route path="/TermsConditions" component={TermsConditions}></Route>}
    {<Route path="/Timer" component={Timer}></Route>}
    </Switch>
  </BrowserRouter>
)}
export default MainRouter;