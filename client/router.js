
/* eslint new-cap: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { AppContainer as HotEnabler } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import createRoutes from './routes';

// import { config } from './utils/config';



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
  const render = (routes) => {
    ReactDOM.render(
      <HotEnabler>
        <MuiThemeProvider>
          <Provider store={store}>
            {routes}
          </Provider>
        </MuiThemeProvider>
      </HotEnabler>,
      document.getElementById('root'),
    );
  };

  render(createRoutes(store, history));

  if (module.hot) {
    module.hot.accept('./routes', () => {
      const nextRoutes = require('./routes')(store);
      render(nextRoutes);
    });
  }
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
