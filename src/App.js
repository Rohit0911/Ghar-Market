import React from "react";
import HomePage from "./Pages/HomePage";
import Offers from "./Pages/Offers";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Private from "./Components/Layout/Private";
import Categories from "./Pages/Categories";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/offers" element={<Offers/>}/>
      <Route path="/category/:categoryName" element={<Categories/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/profile" element={<Private/>}>
          <Route path="/profile" element={<Profile/>}/>
      </Route>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      
    </Routes>

    
  
    </BrowserRouter>
  );
}

export default App;
