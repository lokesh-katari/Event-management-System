import React ,{useState,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom';
const ContactForm = () => {
    const[userData,setuserData]=useState({
      name:"",email:"",phone:"",message:""
    });
    let name,value;
    const handleInputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
  
        setuserData({...userData,[name]:value});
    }

 
    const getData =async()=>{
        try{
          const res=await fetch("/about",{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
              
            },
          });
          const data =await res.json();
          console.log(data)
          setuserData({...userData,name:data.name,email:data.email,phone:data.phone});
          if(!res.status===200){
            const error =new Error(res.error)
            throw error
          }

        }catch(err){
          console.log(err);
          window.alert("couldn't find data");
        }
    }

    useEffect(()=>{
      getData();
    },[]);
   const submitContact=  async(e)=>{
            e.preventDefault(); 
            const{name,email,phone,message}=userData;
            const res= await fetch("/contactSub" ,{

                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  name,email,phone,message
                })
            });
            const data=await res.json();
            console.log(data);
            if(message===""){  
              
              alert("message field couldnot be empty")
            }
            else{
              alert("message sent");
              setuserData({...userData,message:""});
            }

   }
    
  return (
    <>
    <div className="margin">
      <h1>Add userData</h1>
    <form method='POST'>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label> 
    <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp"
    value={userData.name} onChange={handleInputs}
    />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" name='email' className="form-control" id="email"
    value={userData.email} onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="phone" className="form-label">Jntu NO:</label>
    <input type="text"  name="phone"className="form-control" id="phone"
    value={userData.phone} onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="message" className="form-label">Jntu NO:</label>
    <input type="text"  name="message"className="form-control" id="message"
    value={userData.message} onChange={handleInputs}
    />
  </div>
  <div className="mb-3 form-check">
    <input type="text" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={submitContact} >Submit</button>
</form>
</div>
    </>
  )
}

export default ContactForm