import React ,{useEffect}from 'react'
import { useNavigate ,useParams} from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import SideNav from '../Navbar/SideNav'

const Updateproject = () => {
const navigate =useNavigate()
const [projects, setProjects] = useState({id:"",Title:"",Desc:"",Tag:"default",Status:"Incomplete",createdby:"",enduser:"",reqeng:""})
   
const {id}= useParams();
const getproject =async ()=>{
   console.log(id)
  
   const response = await fetch(`http://localhost:4000/fetchproject/${id}`, {
       method: 'GET', 
        headers: {
         'Content-Type': 'application/json',
         'authtoken':localStorage.getItem('token')
         // 'Content-Type': 'application/x-www-form-urlencoded',
       },
     });
     //const json= response.json(); // parses JSON response into native JavaScript objects
    
    
     const project= await response.json(); 
     setProjects(project)
     console.log(project);
    
    
     console.log("Adding a new note")
//  navigate('/');
  }



  const handlesubmit =async (e)=>{
    e.preventDefault();
  
    const response = await fetch(`http://localhost:4000/updateproject/${id}`, {
      method: 'PUT', 
       headers: {
        'Content-Type': 'application/json',
        'authtoken':localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({Title:projects.Title,Desc:projects.Desc,Status:projects.Status ,Tag:projects.Tag, enduser:projects.enduser, reqeng:projects.reqeng}) // body data type must match "Content-Type" header
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


useEffect(() => {
  getproject()

  
}, [])


    return (
        <>
           <Navbar/>
           <div className='container-fluid row  '>
  <SideNav/>
  <div className=' col '>
    <h2 className='mt-5 mb-5 text-success'><b> Update Project</b><br></br>_____________</h2>
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
  
 
  <button type="submit" className="btn btn-success col-3 my-5"><i class="fa-solid fa-pen-to-square fa-lg me-2"></i>Update Project</button>
</form>
</div>
</div>
        </>
    )
}

export default Updateproject
