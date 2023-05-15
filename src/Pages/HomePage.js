import React from 'react'
import Layout from './../Components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate=useNavigate();
  const img1 = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";

  const img2="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
  return (
    
    <Layout  >
      <div className="container mt-4">
        <div className="row">
          <h3>Categories</h3>
          <div className="col-md-5">
            <div className="ImageContainer">
              <img src={img1} alt="Rent" />
              <button className="btn" 
              onClick={()=>{
                navigate('/category/rent')
              }}
              >To Rent</button>
            </div>
          </div>

          <div className="col-md-5">
          <div className="ImageContainer">
              <img src={img2} alt="Rent" />
              <button className="btn"
               onClick={()=>{
                navigate('/category/sale')
              }}
              >For Sale</button>
            </div>
            
          </div>

        </div>

      </div> 
    </Layout >
  )
}
export default HomePage
