import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { replace } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import AppWrapper from './components';
import App from './components/App';
import Loading from './components/Loading';
import UserLogin from './components/UserLogin';

// Authentication Higher Order Components to wrap route components.
const UserIsAuthenticated = UserAuthWrapper({
  // extract user data from state
  authSelector: state => state.auth.user,

  /* When signin is pending but not fulfilled: */
  // determine if signin is pending
  authenticatingSelector: state => state.auth.isLoading,
  // component to render while signin is pending
  // LoadingComponent: UserSignInPending,
  LoadingComponent: Loading,

  /* When signin is not pending. User is authenticated or not. */
  // determine if user is authenticated
  predicate: user => user && user.isVerified,
  // route to signin component
  failureRedirectPath: '/user/signin',

  /* Once signin is successful: */
  // redirect on successful signin to component being authenticated
  allowRedirectBack: true,
  // action to dispatch to redirect
  redirectAction: replace,

  /* For documentation: */
  wrapperDisplayName: 'UserIsAuthenticated',
});

export default (store, history) => (
  <Router history={history}>
    <Route path="/" component={AppWrapper}>
      <IndexRoute component={UserIsAuthenticated(App)} />
      <Route path="/user/signin"
        component={UserLogin}
      />
    </Route>
  </Router>
);
