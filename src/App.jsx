import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
// } from 'react-router-dom';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Order from './pages/Order/Order'; 
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Vendor from './pages/admin/vendor/Dashboard';
import NoPage from './pages/nopage/NoPage';
import PrivacyPolicy from './pages/privacypolicy/privacypolicy';
import TermsNConditions from './pages/termsnconditions/termsnconditions';
import RefundPolicy from './pages/refundpolicy/refundpolicy';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import SignupAdmin from './pages/registration/SignupAdmin';
import LoginAdmin from './pages/registration/LoginAdmin';
import LoginVendor from './pages/registration/LoginVendor';
import ProductInfo from './pages/productInfo/ProductInfo';
// import UpdateProduct from './pages/admin/pages/UpdateProduct';
// import AddProduct from './pages/admin/pages/AddProduct';
import DownloadPdf from './pages/downloads/downloadPdf';
import ContactUs from './pages/contactus/ContactUs';
// SignupAdmin
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoSection from './pages/videoSection/VideoSection';
// import SignupAdmin from './pages/registration/SignupAdmin';
// import Cart from './pages/cart/Cart';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/loginVendor" element={<LoginVendor />} />
          <Route path="/signupAdmin" element={<SignupAdmin />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          {/* <Route path="/addproduct" element={<AddProduct />} /> */}
          {/* <Route path="/updateproduct" element={<UpdateProduct />} /> */}
          <Route path="/downloadPdf" element={<DownloadPdf />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/videoSection" element={<VideoSection />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsnconditions" element={<TermsNConditions />} />
          <Route path="/refundpolicy" element={<RefundPolicy />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
    
  );
}

export default App;
