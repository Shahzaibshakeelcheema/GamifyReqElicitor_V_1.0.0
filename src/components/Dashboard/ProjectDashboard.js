import React , {useRef, useState, useEffect}from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import SideNav from '../Navbar/SideNav';
import './pdashboard.css';

const ProjectDashboard = () => {
 const navigate= useNavigate()
 const ref =useRef(null)
 const {id}= useParams();
 
 const [project, setProject]=useState();
 const [req, setReq]=useState({requirement:"",Status:"Pending"});

 const getprojct= async()=>{
  const response = await fetch(`http://localhost:4000/fetchproject/${id}`, {
    method: 'GET', 
     headers: {
      'Content-Type': 'application/json',
      'authtoken':localStorage.getItem('token')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // body data type must match "Content-Type" header
  });
  //const json= response.json(); // parses JSON response into native JavaScript objects
  
  //alert("Hello! I am an alert box!!");
  
  
  const pro= await response.json(); 
  // setNotes(notes.concat(note))
  console.log(pro);  
  console.log("Get project")
 if(pro?.Status=="Requirement Completed"){
  document.getElementById('reqsubmit').disabled=true;
  document.getElementById('reqsubmit2').disabled=true;
 } 
 if(pro?.Status=="Completed"){
  document.getElementById('completebtn').disabled=true;
 } 
 
}
getprojct()
 const complete= async (lid, progress,Status)=>{ 
  
  const response = await fetch(`http://localhost:4000/completeproject/${lid}`, {
  method: 'PUT', 
   headers: {
    'Content-Type': 'application/json',
    'authtoken':localStorage.getItem('token')
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: JSON.stringify({Progress:progress, Status:Status}) // body data type must match "Content-Type" header
  // body data type must match "Content-Type" header
});
//const json= response.json(); // parses JSON response into native JavaScript objects

//alert("Hello! I am an alert box!!");


const project1= await response.json(); 
// setNotes(notes.concat(note))

console.log("Project completely updated")
setProject(project1);
console.log(project);  

 }

 const getproject=async () => {

  if(localStorage.getItem('token')){
    const response = await fetch(`http://localhost:4000/fetchproject/${id}`, {
       method: 'GET', 
        headers: {
         'Content-Type': 'application/json',
         'authtoken':localStorage.getItem('token')
         // 'Content-Type': 'application/x-www-form-urlencoded',
       },
       // body data type must match "Content-Type" header
     });
     //const json= response.json(); // parses JSON response into native JavaScript objects
     
     //const json= response.json(); 
     const json= await response.json()
     console.log(json)
     console.log(json)
 setProject(json)

console.log(project?._id, project?.Title, project?.Desc)
  

  }else{
   navigate('/login')
  }
  // eslint-disable-next-line 
 }

 useEffect(()=>{getproject()},[])
 

const onclick =()=>{
 navigate(`/requirements/${id}`)
}

const hide =async(e)=>{
  //e.preventDefault();

 
  
  const response = await fetch(`http://localhost:4000/project/${id}/addreq/`, {
    method: 'POST', 
     headers: {
      'Content-Type': 'application/json',
      'authtoken':localStorage.getItem('token')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({requirement:req.requirement,Status:req.Status }) // body data type must match "Content-Type" header
  });
  //const json= response.json(); // parses JSON response into native JavaScript objects
   await setTimeout(()=>{ref.current.click()
  }, 1200);
  //alert("Hello! I am an alert box!!");

  
  const note= await response.json(); 
 // setNotes(notes.concat(note))
  console.log(note);  
  console.log("Requirement Added")

 


}


 const onChange =(e)=>{ 
  setReq({...req,[e.target.name]:e.target.value})
}

  return <div>
    {/* THIS IS THE DASHBOARD OF PROJECT  WHEN USER CLICK ON PROJECT CARD */}
    <Navbar/>
   
    <div className='container-fluid row  '>
  <SideNav/>
  <div className=' col '>
    <h3 className='text-center mt-5 mb-4 ms-4 text-success'>
    <i className="fa-solid fa-file-shield mb-4 fa-2x"></i>
    <br></br><h1><b>Project {project?.Title}</b></h1>_________</h3>



   {/* THIS IS THE ACCORDIAN OF DEFINNING THE RULE OF SUBMISSION OF USER REQUIREMENTS */}

    <div className="accordion container" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
      <button className="accordion-button  text-danger" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
       <b> <i className="fa-solid fa-pen-ruler fa-lg me-3"></i>Rules And Format Of Submitting Requirements</b>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div className="accordion-body">
      <p>   <i className="  fa-solid fa-lg fa-arrow-right-from-bracket me-2" style={{color:"green"}}></i><strong> This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
     <br></br>
    <p>  <i className="  fa-solid fa-lg fa-arrow-right-from-bracket me-2" style={{color:"green"}}></i> <strong> This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
     <br></br>
    <p>  <i className="  fa-solid fa-lg fa-arrow-right-from-bracket me-2" style={{color:"green"}}></i> <strong> This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
      <br></br>
    <p>  <i className="  fa-solid fa-lg fa-arrow-right-from-bracket me-2" style={{color:"green"}}></i> <strong> This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
      <br></br>
  <p>   <i className="  fa-solid fa-lg fa-arrow-right-from-bracket me-2" style={{color:"green"}}></i> <strong> This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
    
      </div>
    </div>
  </div>
  
</div>


<div className="form-group m-5">
    <label htmlFor="exampleFormControlTextarea1" className='text-muted'>Read about rules and Submit the Requirements <br></br><b>______________________</b></label>
    <textarea className="form-control mt-4" id="exampleFormControlTextarea1" name="requirement" value={req.requirement} onChange={onChange} rows="5" required></textarea>
  </div>
  
  
  
<button type="button" id="reqsubmit" onClick={hide} className="btn btn-success col-2 mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
<i className="fa-solid fa-check-double me-2 "></i>Submit Requirement
</button>


<div className="modal  fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content mdesign">
      <div className="modal-header ">
        <h5 className="modal-title mtitle text-danger" id="exampleModalLabel"><b>POINTS ADDED</b></h5>
        <button ref={ref} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


        <h3 className='text-success modelpoint'> <b>YOU GET</b> </h3>
        <h3 className='text-danger modelpoint'>----  <b>10</b>  ----</h3>
        <p className='text-success'>You Will get Points when Your Requirement is verified by Requirement Engineer</p>
      
      
      </div>
      <div className="modal-footer">
     <p className='mfooter text-danger'><b>GamifyReqElicit</b></p>
       </div>
    </div>
  </div>
</div>


  <button className='btn btn-success ms-4 mb-4 col-2' onClick={onclick}><i className="fa-solid fa-eye me-2"></i>View Requirements</button>
  <button id="reqsubmit2" className='btn btn-success ms-3 mb-4'  onClick={()=>{complete(id,50,'Requirement Completed')}}><i className="fa-solid fa-clipboard-check fa-lg me-2"></i>Requirements Completed </button>

      </div>

    
  </div>
  </div>
};

export default ProjectDashboard;
