import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Menu from './pages/Menu';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import React from 'react';
import Users from './pages/Users/Users';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to={'/users'} />} />
            <Route path="/users">
              <Route index element={<Users />} />
            </Route>
          </Route>
          {/* <Route path="/" element={<Menu />} /> */}
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
