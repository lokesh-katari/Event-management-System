import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Aboutme = () => {
    const navigate =useNavigate();

    const[userData,setUser]=useState({});
    const getAboutme =async()=>{
        try{
          const res=await fetch("/about",{
            method:"GET",
            headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
              
            },
            credentials:"include"
          });
          const data =await res.json();
          console.log(data)
          setUser(data);
          if(!res.status===200){
            const error =new Error(res.error)
            throw error
          }

        }catch(err){
          console.log(err);
          navigate("/login");
        }
    }

    useEffect(()=>{
      getAboutme();
    },[]);
  return (
    <>
    <ul className="list-group">
  <li className="list-group-item active" aria-current="true">{userData.name}</li>
  <li className="list-group-item">{userData.phone}</li>
  <li className="list-group-item active">{userData.email}</li>
  <li className="list-group-item">{userData._id}</li>
  <li className="list-group-item">{userData.name}</li>
</ul>
    </>
  )
}

export default Aboutme