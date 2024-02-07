import React from 'react';
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLogin from './pages/login';
import { useSelector } from 'react-redux';
import PageSignup from './pages/signup/index.tsx';
import PageDashboard from './pages/dashboard/index.tsx';
import PageProducts from './pages/products/index.tsx';
import PagePurchases from './pages/purchases';
import Layout from './pages/layout/index.tsx';
import PageUsers from './pages/users/index.tsx';


function App() {

  const {userDetails, jwt } = useSelector(state => state.auth);
 
  return (
 
<BrowserRouter> 
<Routes>
  {(userDetails && jwt) ? <>
    <Route path="/" element={<Layout/>}>
      <Route index element={<PageDashboard />} />
      {userDetails && userDetails.type === 1 &&  <Route path="users" element={<PageUsers/>} /> }
      <Route path="products" element={<PageProducts/>} />
      <Route path="purchases" element={<PagePurchases />} />
      <Route path="/*" element={<div> 404 Not found</div>} />
    </Route>
  </> : <>
  <Route path="/" element={<PageLogin />} />
  <Route path="/signup" element={<PageSignup />} />
  <Route path="/*" element={<div> 404 Not found </div>} />
  </>}
 </Routes>
</BrowserRouter>
  );
}

export default App;
