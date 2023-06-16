import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import SideNav from '../Navbar/SideNav'

const Project = () => {
const navigate =useNavigate()
const [projects, setProjects] = useState({id:"",Title:"",Desc:"",Tag:"default",Status:"Incomplete",createdby:"",useremail:"",reqemail:""})
   
  const handlesubmit =async (e)=>{
    e.preventDefault();
  
    const response = await fetch(`http://localhost:4000/addproject`, {
      method: 'POST', 
       headers: {
        'Content-Type': 'application/json',
        'authtoken':localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({Title:projects.Title,Desc:projects.Desc,Status:projects.Status ,Tag:projects.Tag, useremail:projects.useremail, reqemail:projects.reqemail}) // body data type must match "Content-Type" header
    });
    //const json= response.json(); // parses JSON response into native JavaScript objects
    
    
    const note= await response.json(); 
   // setNotes(notes.concat(note))
    console.log(note);
    
    
    console.log("Adding a new note")
 navigate('/');
  }

  const onChange =(e)=>{ 
    setProjects({...projects,[e.target.name]:e.target.value})
}

    return (
        <>
           <Navbar/>
           <div className='container-fluid row  '>
  <SideNav/>
  <div className=' col '>
    <h2 className='mt-5 mb-5 text-success'><b> Add Project</b><br></br>_____________</h2>
           <form className='container' onSubmit={handlesubmit}>
  <div className="form-group">
  
    <input type="Text" className="form-control" id="exampleInputEmail1" name="Title" value={projects.Title} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Project Name or Title" required/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group mt-4">
 
    <textarea className="form-control " name="Desc" id="exampleFormControlTextarea1" value={projects.Desc} onChange={onChange} rows="7" placeholder='Write Project Description Here' required></textarea>
     </div>
  <div className="form-group mt-4">
    
    <input type="Text" className="form-control" name="Tag" id="exampleInputPassword2" value={projects.Tag} onChange={onChange} placeholder="Project Tag" required/>
  </div>
  
  <div className=" row">
  <div className="form-group col-6 mt-4">
 
    <input type="email" className="form-control " name="reqemail" id="exampleInputPassword2" value={projects.reqemail} onChange={onChange} placeholder="Assign Requirement Engineer Role" required/>
  </div>
  <div className="form-group col-6 mt-4">
    
    <input type="email" className="form-control col-6 " name="useremail" id="exampleInputPassword3" value={projects.useremail} onChange={onChange} placeholder="Assign User Role" required/>
  </div>




 

  </div>
  <button type="submit" className="btn btn-success col-3 my-5"><i class="fa-solid fa-file-circle-plus fa-lg me-2"></i>Add Project</button>
</form>
</div>
</div>
        </>
    )
}

export default Project
