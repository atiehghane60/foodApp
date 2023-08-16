// libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// pages
import Pages from 'pages';
import Layout from 'layout';

function App() {
  return (
    <Layout>
        <Router>
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
          </Routes>
        </Router>
    </Layout>
  );
}

export default App;
