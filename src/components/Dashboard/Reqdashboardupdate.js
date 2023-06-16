import React, { useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import SideNav from '../Navbar/SideNav'

const Reqdashboardupdate = () => {
  const {id}= useParams();
  console.log(id);
  const [upreq,setUpreq]= useState()
const navigate=useNavigate();  

  const getreq= async()=>{ 
  
    const response = await fetch(`http://localhost:4000/req/${id}`, {
    method: 'GET', 
     headers: {
      'Content-Type': 'application/json',
      'authtoken':localStorage.getItem('token')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // body data type must match "Content-Type" header
  });
  const req= await response.json(); 
  // setNotes(notes.concat(note))
  console.log(req);  
  console.log("Requirement Viewed")
  setUpreq(req);
  console.log(req)
   }

  const update=  async()=>{ 

  
    const response = await fetch(`http://localhost:4000/requpdaterequirement/${id}`, {
     method: 'PUT', 
      headers: {
       'Content-Type': 'application/json',
       'authtoken':localStorage.getItem('token')
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     // body data type must match "Content-Type" header
     body: JSON.stringify({requirement:upreq?.requirement,comment:upreq?.Comment}) // body data type must match "Content-Type" header
   });
   //const json= response.json(); // parses JSON response into native JavaScript objects
  
   //alert("Hello! I am an alert box!!");
  
  
   const req= await response.json(); 
   // setNotes(notes.concat(note))
   console.log(req);  
   console.log("Requirement Viewed")
   navigate(-1)
  // setUpreq(req);
  



   }


   useEffect(() => {
     
    if(localStorage.getItem('token')){
      getreq()     
    }
    // eslint-disable-next-line 
   }, [])

   const onchange=(e)=>{
    setUpreq({...upreq,[e.target.name]:e.target.value})
   }

  return (
    <>
    <Navbar/><div className='container-fluid row  '>
  <SideNav/>
  <div className=' col-9 mt-5 ms-5 '>
  <h3 className='text-center  mb-4 ms-4 text-success'>
    <i className="fa-solid fa-file-shield mb-4 fa-2x"></i>
  <br></br> <h1><b>Update Requirement</b> </h1>
    _________</h3>
  <div className="mb-3">
<label htmlFor="edescription" className="form-label">Write Updated requirement Here </label>
  <textarea type="text" className="form-control" id="edescription" name="requiremento" value={upreq?.requirement} onChange={onchange}  rows="3" ></textarea>
</div>


<label htmlFor="edescription" className="form-label"  >Comments about updating requirement by REQ Engineer </label>
  <textarea type="text" className="form-control" id="edescription" name="Comment" rows="3" value={upreq?.Comment}  onChange={onchange}></textarea>


<div id="emailHelp" className="form-text">We'll Serve you the best Experience of Requirements Elicitation Service.</div>
<button type="button" className="btn btn-success m-3" onClick={()=>{update()}}  ><i class="fa-solid fa-pen-to-square me-2 fa-lg"></i>Update Requirement</button>
    
      </div>
      
  </div>
    
    </>
  )
}

export default Reqdashboardupdate