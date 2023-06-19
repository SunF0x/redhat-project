import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Menu from './pages/Menu';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import React from 'react';

const App = () => {
  return (
    <div>
      <Router>
        <Layout />
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/bag" element={<Menu />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
