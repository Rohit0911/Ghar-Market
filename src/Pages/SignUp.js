import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import {BsFillEyeFill} from 'react-icons/bs'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {db} from'../firebase.config'
import {doc,setDoc,serverTimestamp} from 'firebase/firestore'
import { toast } from 'react-toastify';
import OAuth from '../Components/Layout/OAuth'



const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    name:'',
    password: ''
  })
  const {name,email,password}=formData
  const navigate = useNavigate()
    
  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value,
    }));
  }; 

  const onSubmitHndler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db,"users",user.uid),formDataCopy);
      navigate("/");
      toast.success('Signup Successfully');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-30">
        <form className='bg-light p-4' onSubmit={onSubmitHndler}>
          <h3 className='bg-dark p-2 mt-2 text-light text-center'>Sign Up</h3>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Enter Name</label>
            <input type="text" 
            value={name}
            className="form-control" 
            id="name"
            onChange={onChange} 
            aria-describedby="nameHelp" />
            </div>

            <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
            <input type="email" 
            value={email}
            className="form-control"
            onChange={onChange}
             id="email" 
             aria-describedby="emailHelp" />
            </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
            type={showPassword ? 'text':'password'} 
            value={password}
            onChange={onChange}
            className="form-control" 
            id="password" />
            <span>Show password <BsFillEyeFill 
            className='text-danger ms-2'
            style={{cursor:'pointer'}}
            onClick={()=>{setShowPassword((prevState)=>!prevState);}}
            /></span>
          </div>
          
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <div className='mt-3 ms-1'>
           
           <OAuth/>
           <span>Already User</span> <Link to="/signin">Login</Link>
          </div>
        </form>
       

      </div>
    </Layout>
  )
}

export default SignUp
