import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; //Navigate,
import Bag from './pages/Bag/Bag';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import Order from './pages/Order/Order';
import OrderId from './pages/Order/OrderId';
import ProcessOrder from './pages/ProcessOrder/ProcessOrder';
import ProcessOrderId from './pages/ProcessOrder/ProcessOrderId';
import React from 'react';
import Report from './pages/Report/Report';
import ReportId from './pages/Report/ReportId';
import User from './pages/User/User';
// import { parseJwt } from './utils/accessToken';

const App = () => {
  return (
    <div>
      <Router>
        <Layout />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/user" element={<User />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/my-order" element={<Order />} />
          <Route path="/my-order/:id" element={<OrderId />} />
          <Route path="/process-order" element={<ProcessOrder />} />
          <Route path="/process-order/:id" element={<ProcessOrderId />} />
          <Route path="/report" element={<Report />} />
          <Route path="/report/:id" element={<ReportId />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
