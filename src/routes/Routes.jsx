import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import ActivateAccount from '../components/activate-account/ActivateAccount';
import ForgotPassword from '../components/forgot-password/ForgotPassword';
import ResetPassword from '../components/reset-password/ResetPassword';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import ImageUpload from '../components/image-upload/ImageUpload';
import Login from '../components/login/Login';
import Register from '../components/register-user/Register';
import AddQuestionPage from '../components/add-question-page/AddQuestionPage';
import AllQuestionsPage from '../components/all-questions-page/AllQuestionsPage';
import SingleQuestionPage from '../components/single-question-page/SingleQuestionPage';
import ControlPanelPage from '../components/control-panel-page/ControlPanelPage';
import FormPage from '../components/form-page/FormPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path='/' exact component={Login} />
        <PublicRoute path='/login' exact component={Login} />
        <PublicRoute path='/register' exact component={Register} />
        <PublicRoute
          restricted
          path='/auth/activate/:token'
          exact
          component={ActivateAccount}
        />
        <PublicRoute
          path='/auth/password/forgot'
          exact
          component={ForgotPassword}
        />
        <PublicRoute
          restricted
          path='/auth/password/reset/:token'
          exact
          component={ResetPassword}
        />
        {/* <PrivateRoute path='/add-question' exact component={AddQuestion} /> */}
        <PrivateRoute path='/ask-question' exact component={AddQuestionPage} />
        <PrivateRoute
          path='/all-questions'
          exact
          component={AllQuestionsPage}
        />
        <PrivateRoute path='/forms' exact component={FormPage} />
        <PrivateRoute
          path='/employee-queries'
          exact
          component={AllQuestionsPage}
        />
        <PrivateRoute
          path='/control-panel'
          exact
          component={ControlPanelPage}
        />
        <PrivateRoute
          path='/question/:id'
          exact
          component={SingleQuestionPage}
        />
        <Redirect to='/'></Redirect>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
