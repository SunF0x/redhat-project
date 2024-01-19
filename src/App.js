import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; //Navigate,
import Bag from './pages/Bag/Bag';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import Menus from './pages/Admin/Menus';
import MenusId from './pages/Admin/MenusId';
import Order from './pages/Order/Order';
import OrderId from './pages/Order/OrderId';
import ProcessOrder from './pages/ProcessOrder/ProcessOrder';
import ProcessOrderId from './pages/ProcessOrder/ProcessOrderId';
import Promo from './pages/Admin/Promo';
import React from 'react';
import Report from './pages/Report/Report';
import ReportId from './pages/Report/ReportId';
import Terms from './pages/Admin/Terms';
import User from './pages/User/User';
import Users from './pages/Admin/Users';
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

          <Route path="/menus" element={<Menus />} />
          <Route path="/menus/:id" element={<MenusId />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
