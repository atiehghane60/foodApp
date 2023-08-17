// libraries
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
} from 'react-router-dom';
// pages
import Pages from 'pages';
import Layout from 'layout';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          {Pages.map((route) => {
            const Page = route.component;
            return (
              <Route
                key={route.id}
                exact={route.exact}
                path={route.path}
                element={<Page />}
              />
            );
          })}
        </Routes>{' '}
      </Layout>
    </HashRouter>
  );
}

export default App;
