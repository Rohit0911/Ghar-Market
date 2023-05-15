import React,{useEffect,useState} from 'react'
import Layout from '../Components/Layout/Layout'
import {useParams} from 'react-router-dom'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import {collection,getDocs,query,where,orderBy,limit,startAfter} from 'firebase/firestore'
import Spinner from '../Components/Spinner'



const Categories = () => {
    const [listing,setListing]=useState("")
    const [loading,setLoading]=useState(true)
    const params=useParams();

    useEffect(()=>{
       const fetchListing=async()=>{
          try{
            //reference
            const listingRef=collection(db,'listings')
            //Query
            const q=query(listingRef,where('type','==',params.categoryName),
            orderBy('timestamp','desc'),
            limit(10) 
            )
            //Execute query
            const querySnap=await getDocs(q)
            const listings=[]
            querySnap.forEach(doc=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                }) 
            });
            setListing(listing)
            setLoading(false); 

          }catch(error){
             toast.error('Unable to fetch data')
          }
       };
       //function call
       fetchListing();
    },[params.categoryName])
  return (
    <Layout>
        <div className="mt-3 container-fluid">
        <h2>{params.categoryName==='rent' ?
        'Places for Rent ':'Places for sale '}</h2>
        {
            loading ? (<Spinner/>) : listing && listing.length > 0 ?
            (<>
               <div>
                {listing.map(list=>(
                    <h3 key={list.id}>{list.data.name}</h3>
                ))}
               </div>
            
            </>)
            :(<p>No listing For {params.categoryName}</p>)
        }

        </div>
        
    </Layout>

  )
}

export default Categories