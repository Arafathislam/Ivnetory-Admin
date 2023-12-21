import React from 'react'
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import {getToken} from '../services/LocalStorageService.js';
const UserProtect = () => {
  let token =getToken('token');
  let isLoggedIn=token? true:false
  let location = useLocation();
  
  
      if(isLoggedIn){
        return (
            <>
         
              <Outlet />
            </>
          );
    }
 
      return <Navigate to="/" state={{ from: location }} />;

  
}

export default UserProtect
