import React from 'react'
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import {getTokenAdmin} from '../services/LocalStorageService.js';
import Navbar from '../component/admin/Navbar.js';
const AdminProtect = () => {
  let token =getTokenAdmin('admin');
  let location = useLocation();
  let isLoggedIn=token? true:false
// let isLoggedIn=true;



    if(isLoggedIn){
        return (
            <>
              <Navbar />
              <Outlet />
            </>
          );
    }
 
      return <Navigate to="/" state={{ from: location }} />;
  
  
}

export default AdminProtect
