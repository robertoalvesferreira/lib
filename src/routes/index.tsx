import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn/Index';
import SignUp from '../pages/SignUp/Index';
import ForgotPassword from '../pages/ForgotPassword/Index';
import Pessoas from '../pages/Pessoas/index'
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword}/>
    <Route path="/pessoas" component={Pessoas}/>
  </Switch>
);

export default Routes;
