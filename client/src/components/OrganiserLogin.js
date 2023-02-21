import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";

const Register = () => {
  const navigate=useNavigate();
  const[user,setUser]=useState({
    name:"",email:"",phone:"",pass:"",Cpass:""
  });
  let name,value;
  const handleInputs=(e)=>{
      name=e.target.name;
      value=e.target.value;

      setUser({...user,[name]:value});
  }
  const postData=async (e)=>{
          e.preventDefault();
          const{name,email,phone,pass,Cpass}=user;
          const res=await fetch("/Orga-register",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              
            },
            body:JSON.stringify({
              name,email,phone,pass,Cpass//if name and variable is same no need to defien like name:name....etc
            })
          });
          console.log(res.status);
          const data= await res.json();
          console.log(data)
          if(res.status ===200){
            window.alert("Registration");

            navigate("/login");
          }
          else{
            window.alert("Registration unSuccessfull")
          }

  }
  



  return (
    <>
    <div className="margin">
      <h1>Register</h1>
    <form method='POST'>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label> 
    <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp"
    value={user.name} onChange={handleInputs}
    />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" name='email' className="form-control" id="email"
    value={user.email} onChange={handleInputs}

    />
  </div>
  <div className="mb-3">
    <label htmlFor="phone" className="form-label">Jntu NO:</label>
    <input type="text"  name="phone"className="form-control" id="phone"
    value={user.phone} onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="pass" className="form-label">Password</label>
    <input type="password" name='pass' className="form-control" id="pass"
    value={user.pass} onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="Cpass" className="form-label">Confirm Password</label>
    <input type="password"name='Cpass' className="form-control" id="Cpass"
    value={user.Cpass} onChange={handleInputs}
    />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={postData}>Submit</button>
</form>
</div>
    
    </>
  )
}

export default Register