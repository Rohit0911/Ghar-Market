import Layout from '../Components/Layout/Layout'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {BsFillEyeFill} from 'react-icons/bs'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify';
import OAuth from '../Components/Layout/OAuth'


const SignIn = () => {
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

  const loginHandler=async (e)=>{
      e.preventDefault()
      try{
        const auth=getAuth()
        const userCredential=await signInWithEmailAndPassword(auth,email,password)
        if(userCredential.user){
          toast.success('Login Success')
          navigate('/')
        }
      }catch(error){
        console.log(error)
        toast.error("The email or password is incorrect")
      }
  }

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-30">
        <form className='bg-light p-4' onSubmit={loginHandler}>
          <h3 className='bg-dark p-2 mt-2 text-light text-center'>Sign In</h3>
          

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

            <Link to="/forgotpassword">Forgot Password</Link>
          </div>

          
          
          <button type="submit" className="btn btn-primary">Sign in</button>
          
          <OAuth/>
          <div className='ms-1 mt-3' >
           
           <span>New User</span> <Link to="/signup">Sign Up</Link>
          </div>
        </form> 
       

      </div>
    </Layout>
  )
}

export default SignIn
