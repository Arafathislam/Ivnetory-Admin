import React from 'react'
import {BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard.js';
import AllProduct from './component/product/AllProduct.js';
import AddProduct from './component/product/AddProduct.js';
import ChnagePassword from './component/admin/ChangePassword.js';
import ProductDetail from './component/product/ProductDetail.js';
import UpdateProduct from './component/product/UpdateProduct.js';
import StockUpdate from './component/product/StockUpdate.js';
import SaleProduct from './component/product/SaleProduct.js';
import DailySales from './component/report/DailySales.js';
import ShopingCart from './component/product/ShopingCart.js';
import AllReceipt from './component/receipt/AllReceipt.js';
import MonthlySales from './component/report/MonthlySales.js';
import Login from './component/login/Login.js';
import Signup from './component/signup/SignUp.js';
import Settings from '../src/component/user/Settings.js'
import Support from './component/user/Support.js';
import ResetPassword from './component/signup/ResetPassword.js';
import UserProtect from '../src/protectedRoute/UserProtect.js'
import {getToken} from './services/LocalStorageService.js';
import AdminLogin from './component/admin/AdminLogin.js';
import Navbar from './component/admin/Navbar.js';
import AdminProtect from './protectedRoute/AdminProtect.js';
import AdminMonitor from './component/admin/AdminMonitor.js';
import FileUpload from './component/admin/FileUpload.js';
import UserDetails from './component/admin/UserDetails.js';
function App() {
  let token =getToken('token');
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={!token ? <Login/> : <Navigate to="/dashboard"/>}/>
        


      <Route element={<UserProtect/>}>      

        <Route path="dashboard" element={ <Dashboard /> } />
        <Route path="cart" element={<ShopingCart />} />
        <Route path="setting" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="reset" element={<ResetPassword />} />
        <Route path="allproduct" element={<AllProduct />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="productdetail/:id" element={<ProductDetail />} />
        <Route path="updateproduct/:id" element={<UpdateProduct />} />
        <Route path="stockupdate/:id" element={<StockUpdate />} />
        <Route path="saleproduct/:id" element={<SaleProduct />} />
        <Route path="allreceipt" element={<AllReceipt />} />
        <Route path="dailysale" element={<DailySales />} />
        <Route path="monthlysale" element={<MonthlySales />} /> 

        </Route>
        */}

        <Route path="/" element={<AdminLogin/>} />
        <Route element={<AdminProtect/>}>
        <Route path="/signup" element={ <Signup/>}/>
        <Route path="/monitor" element={ <AdminMonitor/>}/>
        <Route path="/file" element={ <FileUpload/>}/>
        <Route path="/details" element={ <UserDetails/>}/>
        <Route path="/changepass" element={ <ChnagePassword/>}/>

        </Route>
        

      
      </Routes>
    </Router>
  );
}

export default App