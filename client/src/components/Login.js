import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate =useNavigate();
  const [email,setEmail]=useState('');
   const [pass,setPass]=useState('');

   const Userlogin= async(e)=>{
    e.preventDefault();
        const res= await fetch("/login",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              email,pass
            })
        });
        const data= await res.json();
        console.log(data)        // console.log(data)
        console.log(res.status);
        if (res.status=== 200){
          window.alert("Login successful")
          navigate("/");
        }
        else{
          window.alert("Invalid Credentials")

        }
   }  
   const Organiserlogin= async(e)=>{
    e.preventDefault();
        const res= await fetch("/Orga-Signin",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              email,pass
            })
        });
        const data= await res.json();
        console.log(data)        // console.log(data)
        console.log(res.status);
        if (res.status=== 200){
          window.alert("Login successful")
          navigate("/");
        }
        else{
          window.alert("Invalid Credentials")

        }
   }  

  return (
    <><div className="margin">
      <h1>Login</h1>
    <form method='POST'>
  <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="one" aria-describedby="emailHelp" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 ">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="two" value={pass} onChange={(e)=>setPass(e.target.value)}/>
  </div>
  <div className="mb-3 form-check ">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={Userlogin}>Submit User</button>
  <button type="submit" className="btn btn-primary mx-4" onClick={Organiserlogin}>Submit Organiser</button>
</form>
</div>
    </>
  )
}

export default Login