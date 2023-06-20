import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Bag from './pages/Bag/Bag';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import Order from './pages/Order/Order';
import OrderId from './pages/Order/OrderId';
import React from 'react';

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
          {/* <Route index element={<Order />} /> */}
          <Route path="/my-order/:id" element={<OrderId />} />
          {/* </Route> */}
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
