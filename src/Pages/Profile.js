import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout/Layout'
import { getAuth, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify';
import { db } from "../firebase.config";
import { FaEdit } from 'react-icons/fa'
import { MdDoneOutline } from "react-icons/md"
import {doc,updateDoc } from 'firebase/firestore'

const Profile = () => {

  const auth = getAuth();
  const navigate = useNavigate()

  const [changeDetails, setChangeDetails] = useState(false)


  const [formData, setFormData] = useState({
    name: auth.currentUser ? auth.currentUser.displayName : "",
    email: auth.currentUser ? auth.currentUser.email : ""
  });
  

  const { name, email } = formData
  
  const logoutHandler = () => {
    auth.signOut()
    toast.success('Successfully logged out')
    navigate("/");
  }

  const onChange=(e)=>{
      setFormData(prevState=>({
          ...prevState,
          [e.target.id] : e.target.value
      }))
  }




  const onSubmit = async () => {
    try {
      if (auth.currentUser && auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { name });
        toast.success("User updated !");
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  


  return (<Layout>
    <div className="container mt-4 w-50  d-flex justify-content-between"><h4>Profile Details</h4>
      <button className='btn btn-danger' onClick={logoutHandler}>Logout</button> </div>
    <div className="container mt-4 card" style={{ width: '18rem' }}>

      <div className="card-header">
        <div className='d-flex justify-content-between'>
          <p>Users Personal Details</p>
          <span style={{ cursor: 'pointer' }}
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(prevState => !prevState)
            }}>
            {changeDetails ? <MdDoneOutline color="green" /> : <FaEdit color="red" />}
          </span>
        </div>
      </div>




      <div className="card-body">
        <form>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} 
            onChange={onChange}/>
            
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" value={email} id="email" aria-describedby="emailHelp" 
            onChange={onChange}
            disabled={!changeDetails}/>
            
          </div>
          
         
          
        </form>




      </div>
    </div>



  </Layout>);
}

export default Profile;
