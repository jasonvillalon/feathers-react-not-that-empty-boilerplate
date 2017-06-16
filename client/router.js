
/* eslint new-cap: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { replace } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import { config } from './utils/config';

import AppWrapper from './components';
import App from './components/App';
import Loading from './components/Loading';

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

// const UserIsAdmin = UserAuthWrapper({
//   authSelector: state => state.auth.user,
//   predicate: (user) => {
//     if (!(user && user.isVerified && user.roles)) {
//       return false;
//     }
//
//     return config.users.roles.allowedToChangeRoles.some(role => user.roles.indexOf(role) !== -1);
//   },
//   failureRedirectPath: '/user/signin',
//   allowRedirectBack: false,
//   // redirectAction: replace,
//   wrapperDisplayName: 'UserIsAdmin',
// });
// Routing
export default function (store, history) {
  // console.log('MuiThemeProvider', config.client.defaultRoute);
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={AppWrapper}>
            <IndexRoute component={UserIsAuthenticated(App)} />
            <Route path="/user/signin"
              component={require(
                         'react-router-proxy-loader?name=user!./components/UserLogin/index.js',
                         )}
            />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
  );
}

/*
If you want to dynamically load code for infrequently used routes,
the following, an extract from another project, shows how with React-Router v2.x.x.

You would also have to uncomment lines in webpack.production.config.js dealing with the
user chunk.

<Route path="/" component={AppWrapper}>
  <IndexRedirect to="/songs/filter" />
  <Route path="user/signup" component={require(
                   'react-router-proxy?name=user!./screens/Users/UserSignUp'
                   )}
  />
  <Route path="user/validateSignUpEmail/:token" component={require(
                   'react-router-proxy?name=user!./screens/Users/UserValidateSignUpEmail'
                   )}
  />
  <Route path="user/signin" component={UserSignIn} />
  <Route path="user/sendForgotPwdEmail" component={require(
                   'react-router-proxy?name=user!./screens/Users/UserSendForgotPwdEmail'
                   )}
  />
  <Route path="user/validateForgotPasswordEmail/:token" component={require(
                   'react-router-proxy?name=user!./screens/Users/UserValidateForgotPwdEmail'
                   )}
  />
  <Route path="user/profile" component={UserIsAuthenticated(require(
                   'react-router-proxy?name=user!./screens/Users/UserProfile'
                   ))}
  />
  <Route path="user/changePassword" component={UserIsAuthenticated(require(
                   'react-router-proxy?name=user!./screens/Users/UserChangePwd'
                   ))}
  />
  <Route path="user/changeEmail" component={UserIsAuthenticated(require(
                   'react-router-proxy?name=user!./screens/Users/UserChangeEmail'
                   ))}
  />
  <Route path="songs" component={UserIsAuthenticated(SongsWrapper)} >
    <Route path="filter" component={SongsFilter} />
    <Route path="add" component={SongAdd} />
    <Route path=":id" component={SongDetails} />
    <Route path="modify/:id" component={SongModify} />
  </Route>
</Route>
*/
