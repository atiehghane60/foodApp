// libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// pages
import Pages from 'pages';

function App() {
  return (
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
  );
}

export default App;
