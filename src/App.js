import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; //Navigate,
import Bag from './pages/Bag/Bag';
import CookOrder from './pages/Cook/CookOrder';
import CookOrderId from './pages/Cook/CookOrderId';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import Order from './pages/Order/Order';
import OrderId from './pages/Order/OrderId';
import React from 'react';
// import { parseJwt } from './utils/accessToken';

const App = () => {
  return (
    <div>
      <Router>
        <Layout />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/my-order" element={<Order />} />
          <Route path="/my-order/:id" element={<OrderId />} />
          <Route path="/cook-order" element={<CookOrder />} />
          <Route path="/cook-order/:id" element={<CookOrderId />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
