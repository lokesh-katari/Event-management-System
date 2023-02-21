import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const AddEvent = () => {
    const navigate =useNavigate();
    const[Event,setEvent]=useState({
     email:"",name:"",startDate:"",endDate:"",mode:""
    });

    let name,value;
    const handleInputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
  
        setEvent({...Event,[name]:value});
    }

    const getEmail=async()=>{
      try{
        const res=await fetch("/aboutO",{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
            
          },
        });
        const data =await res.json();
        console.log(data)//comment it
        setEvent({...Event,email:data.email});
        if(!res.status===200){
          const error =new Error(res.error)
          throw error
        }

      }catch(err){
        console.log(err);
        window.alert("couldn't find Organiser in database please check the data");
      }
    }
    useEffect(()=>{
      getEmail();
    },[]);
 
    const getEvent =async(e)=>{
      e.preventDefault();
      const{name,startDate,endDate,mode,email}=Event;
        try{
          const res=await fetch("/addEvent",{  
            method:"POST",
            headers:{
              "Content-Type":"application/json"
              
            },
            body:JSON.stringify({
              name,startDate,endDate,mode,email//if name and variable is same no need to defien like name:name....etc
            })
          });
          const data =await res.json();
          console.log(data)
     
          if(!res.status===201){
            const error =new Error(res.error)
            throw error
          }
          else if(res.status===422){
            window.alert("please fill the field");
          }
          else if(res.status===201){
            alert("event added");
            setEvent({name:"",startDate:"",endDate:"",mode:""});
          }

        }catch(err){
          console.log(err);
          navigate("/login");
        }
    }

    // useEffect(()=>{
    //   getEvent();because it does not get data when loaded
    // },[]);

    
  return (
    <>
    <div className="margin">
      <h1>Add Event</h1>
    <form method='POST'>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Event Name</label> 
    <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp"
    value={Event.name} onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="startDate" className="form-label">Start Date</label>
    <input type="date" name='startDate' className="form-control" id="startDate"
    value={Event.startDate} onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="endDate" className="form-label">End Date</label>
    <input type="date"  name="endDate"className="form-control" id="endDate"
    value={Event.endDate} onChange={handleInputs}
    />
  </div>
  {/* <div className="mb-3">
    <label htmlFor="name" className="form-label">Mode</label> 
    <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp"
    value={Event.mode} onChange={handleInputs}
    />
  </div> */}
  <label htmlFor="mode">choose MOde</label>

<select name="mode" id="mode"  onChange={handleInputs}>
  <option value="offline" onChange={handleInputs}>offline</option>
  <option value="online" onChange={handleInputs}>online</option>

</select>
<button type="submit" className="btn btn-primary" onClick={getEvent}>SubmitUSER</button>

</form>
</div>
    </>
  )
}

export default AddEvent