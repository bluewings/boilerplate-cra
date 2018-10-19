/* eslint-disable react/prop-types, react/no-array-index-key */
import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Layout from 'components/Layout';
// import { withIntlProvider } from 'useIntl';
import { routeChange } from 'stores/app.action';
import routes from './routes';
// import './shared/styles/variables';

// const REDIRECT_URI = {
//   DEFAULT: '/manage/advertisers',
//   LOGIN: '/login',
//   INCOMPLETE_USER: '/account/incomplete',
//   EMAIL_VERIFICATION: '/account/verify',
// };

/* eslint-disable max-len */

const rules = [{
  // redirect
  test: ({ redirect }) => redirect,
  route: props => <Redirect {...props} />,
// }, {
//   // Login is required.
//   test: ({ user, isPublic }) => !user && !isPublic,
//   route: ({ location }) =>
//     <Redirect to={{ pathname: REDIRECT_URI.LOGIN, state: { from: location } }} />,
// }, {
  // Email verification is required.
//   test: ({ user, path }) =>
//     user && user.provider === 'neoId' && user.emailCert === false &&
//     path !== REDIRECT_URI.EMAIL_VERIFICATION,
//   route: () => <Redirect to={REDIRECT_URI.EMAIL_VERIFICATION} />,  
// }, {
//   // Imcomplete user
//   test: ({ user, path }) =>
//     user && !user.account && path !== REDIRECT_URI.INCOMPLETE_USER && path.search(/\/manage\/requests\/.*/) === -1,
//   route: () => <Redirect to={REDIRECT_URI.INCOMPLETE_USER} />,
// }, {
  // Already logged in
  // test: ({ user, path }) => 
  //   user &&
  //   (path === REDIRECT_URI.LOGIN || (user.account && path === REDIRECT_URI.INCOMPLETE_USER)),
  // route: () => <Redirect to={REDIRECT_URI.DEFAULT} />,
}];

const getWrapComponent = (LayoutDefined) => {
  if (LayoutDefined === false) {
    return Fragment;
  } else if (LayoutDefined) {
    return LayoutDefined;
  }
  return Layout;
};

const NotFound = () => <h1>404.. This page is not found!</h1>;

const getRoutes = (store) => {
  const getUser = () => store.getState().user;
  

  let allRoutes = routes.map(({
    component: Component,
    exact,
    layout,
    path,
    redirect,
    ...rest
  }, i) => {
    const WrapComponent = getWrapComponent(layout);
    console.log(WrapComponent);

    const renderRoute = (routeProps) => {
      const user = getUser();

      // console.log(user);
      const matched = rules.find(({ test }) => test({
        user, redirect, path, ...rest, 
      }));
      if (matched) {
        return matched.route({ ...rest, ...routeProps });
      }

      store.dispatch(routeChange({ path, ...rest }));

      const { title = '', props: otherProps = {} } = rest;
      //   if (subLayout) {
      //     const SubLayout = subLayout;
      //     return (
      //       <WrapLayout {...layoutProps}>
      //         <SubLayout>
      //           <ErrorBoundary>
      //             <Component {...routeProps} {...otherProps} title={title} />
      //           </ErrorBoundary>
      //         </SubLayout>
      //       </WrapLayout>
      //     );
      //   }
      //   return (
      //     <WrapLayout {...layoutProps}>
      //       <ErrorBoundary>
      //         <Component {...routeProps} {...otherProps} title={title} />
      //       </ErrorBoundary>
      //     </WrapLayout>
      //   );
      // }}

      return (  
      // <WrapComponent>

        <Component {...routeProps} {...otherProps} title={title} />

      // </WrapComponent>
      );
    };
    
    return (
      <Route
        key={`route-${i}`}
        exact={!!exact}
        path={path}
        render={renderRoute}
      />
    );
  });

  allRoutes = [...allRoutes,
    <Route key="route-not-found" component={NotFound} />, 
  ];
  return () => (
    <Route render={({ location }) => {
      console.log(location);
      return (
        <Layout>
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={500}>
              <Switch location={location}>{allRoutes}</Switch>
            </CSSTransition>
          </TransitionGroup>
        </Layout>
      );
    }}
    />
  );
};

export default { getRoutes };

export { getRoutes };


// ///

/* eslint-disab react/no-array-index-key */
// import React from 'react';
// import _ from 'lodash';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import Layout from 'components/Layout';
// import ErrorBoundary from 'components/ErrorBoundary';
// import { withIntlProvider } from 'useIntl';
// import App from './App';
// import routes from './routes';
// import { routeChange } from './shared/stores/routes.actions';
// // import EmailVerification from './screens/Common/screens/EmailVerification';

// const REDIRECT_URI = {
//   DEFAULT: '/campaigns',
//   LOGIN: '/login',
//   INCOMPLETE_USER: '/account/incomplete',
//   EMAIL_VERIFICATION: '/account/verify',
// };

// const allRoutes = [
//   ...routes,
//   { redirect: true, path: '*', to: REDIRECT_URI.DEFAULT },
// ];

// const getRoutes = (store) => {

//   const AllRoutes = allRoutes.map(({
//     component: Component,
//     redirect,
//     layout,
//     layoutProps,
//     subLayout,
//     ...rest
//   }, i) => (
//     <Route
//       key={`route-${i}`}
//       render={(routeProps) => {
//         const user = getUser();


//         store.dispatch(routeChange(rest));
//         if (layout === false) {
//           return (
//             <ErrorBoundary>
//               <Component {...routeProps} />
//             </ErrorBoundary>
//           );
//         }
//         const WrapLayout = typeof layout === 'function' ? layout : Layout;
//         const { title = '', props: otherProps = {} } = rest;
//         if (subLayout) {
//           const SubLayout = subLayout;
//           return (
//             <WrapLayout {...layoutProps}>
//               <SubLayout>
//                 <ErrorBoundary>
//                   <Component {...routeProps} {...otherProps} title={title} />
//                 </ErrorBoundary>
//               </SubLayout>
//             </WrapLayout>
//           );
//         }
//         return (
//           <WrapLayout {...layoutProps}>
//             <ErrorBoundary>
//               <Component {...routeProps} {...otherProps} title={title} />
//             </ErrorBoundary>
//           </WrapLayout>
//         );
//       }}
//       {...rest}
//     />
//   ));

//   return () => withIntlProvider(
//     <App>
//       <Switch>
//         {AllRoutes}
//       </Switch>
//     </App>,
//   );
// };

// export default { getRoutes };

// export { getRoutes };
