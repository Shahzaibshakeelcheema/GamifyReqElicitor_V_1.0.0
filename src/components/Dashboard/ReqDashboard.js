import React,{useEffect,useState} from 'react';
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SideNav from '../Navbar/SideNav';
import './reqDashboard.css'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Alert from '../Alerts/Alert';

const ReqDashboard = () => {
  const navigate=useNavigate();
  const reqtinitial=[
        
  ]
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
   if(pro?.Status=="Checked Requirement"){
    document.getElementById('btncomplete').disabled=true;
   } 
   if(pro?.Status=="Completed"){
    document.getElementById('completebtn').disabled=true;
   } 
   
  }

  const {project1}=useLocation();
  console.log(project1)
    const[reqs, setReq]= useState(reqtinitial);
    const [project,setProject]=useState()
    const {id}=useParams();
    getprojct()
  if(reqs.Status=='Verified'){
    document.getElementById('verifybtn').disabled=true;
  }
    const downloadpdf=()=>{
    const pdf= new jsPDF();
    
    pdf.autoTable({html:'#tabledata'})
    pdf.save('SRSDOCUMENT.PDF')

  }
  
  
  
    const getreq= async ()=>{ 
  


    const response = await fetch(`http://localhost:4000/allreq/${id}`, {
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
  
  
  const req= await response.json(); 
  // setNotes(notes.concat(note))
  console.log(req);  
  console.log("Requirement Viewed")
  setReq(req);
  console.log(req)
  if(reqs.Status==="Verified"){
    document.getElementById('verifybtn').disabled=true;
  }
  
   }
  


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

   const complete1= async (lid, progress,Status)=>{ 
  
    const response = await fetch(`http://localhost:4000/completeproject/${lid}`, {
    method: 'PUT', 
     headers: {
      'Content-Type': 'application/json',
      'authtoken':localStorage.getItem('token')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({Progress:progress,Status:Status}) // body data type must match "Content-Type" header
    // body data type must match "Content-Type" header
  });
  //const json= response.json(); // parses JSON response into native JavaScript objects
  
  //alert("Hello! I am an alert box!!");
  
  
  const project1= await response.json(); 
  // setNotes(notes.concat(note))
 
  console.log("Project completely updated")
  setProject(project1);
  console.log(project);  
  const pdf= new jsPDF();
    
    pdf.autoTable({html:'#tabledata'})
    pdf.save('SRSDOCUMENT.PDF')
 
   }


const addrequirement=(pid)=>{
  navigate(`/project/${pid}`)
}

  const verify =async (lid)=>{
  console.log(lid)
  
  const response = await fetch(`http://localhost:4000/addpoints/${lid}`, {
    method: 'PUT', 
     headers: {
      'Content-Type': 'application/json',
      'authtoken':localStorage.getItem('token')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // body data type must match "Content-Type" header
   // body: JSON.stringify({requirement:upreq?.requirement}) // body data type must match "Content-Type" header
  });
  //const json= response.json(); // parses JSON response into native JavaScript objects
  
  //alert("Hello! I am an alert box!!");
  
  
  const req= await response.json(); 
  // setNotes(notes.concat(note))
  console.log(req);  
  console.log("Requirement Updated Viewed")
  console.log(req)
     window.location.reload();
   
  await setTimeout(() => {
    document.getElementById('valert').style.display = "block";
   
   }, 2000);
     

  }

  const open= (lid)=>{
   navigate(`/Reqdashboardupdate/${lid}`)
  }
  
  
  useEffect(() => {
     
    if(localStorage.getItem('token')&& localStorage.getItem('token')){
      getreq()     
    }else{
     navigate('/login')
    }
    // eslint-disable-next-line 
   }, [])
  
  
  return <>
  <Navbar/><div className='container-fluid row  '>
 <SideNav/>
 <div className=' col-10 ms-4 '>
 <h3 className='text-center mt-5 mb-4 ms-4 text-success'>
    <div id="valert"  style={{display:"none"}}><Alert  message='Requirement Verified successfully '></Alert></div>
    <i className="fa-solid fa-file-shield mb-4 fa-2x"></i>
  <br></br> <h1><b>Submitted Requirements</b></h1>
    _________</h3>

  
     <table className=" table table-striped"  style={{wordWrap:'break-word',tableLayout:'fixed'}}>
 <thead className='bg-dark text-light text-center'>
   <tr className='theader bg-success' >
     <th className='p-4 col-6'scope="col">Requirements</th>
     <th className='p-4' scope="col">Status</th>
     <th className='p-4' scope="col">Submitted By</th>
   <th className='p-4'scope="col">Verify/Update</th>
 
   </tr>
 </thead>
 <tbody>
 {
reqs.map((req)=>{
   return   <tr key={req?._id} >
   <td className="pt-4 pb-4" >{req?.requirement}</td>
   <td  className="pt-4 pb-4">{req?.Status}</td>
   <td  className="pt-4 pb-4">{req?.submittedby}</td>
     <td className="pt-4 pb-4"><button id='verifybtn' className='btn btn-success me-2' disabled= {req?.Status=='Verified'?true:false} onClick={()=>{verify(req?._id)}}> <i className="fa-solid fa-file-circle-check"></i>Verify</button>
     <button type="button" className="btn btn-success " onClick={()=>{open(req?._id)}}>
     <i className="fa-solid fa-pen-to-square"></i> Update
</button></td>

 </tr>
         
         
        })} 
  
  
  
 </tbody>
</table>



<table className=" table table-striped d-none" id='tabledata' style={{wordWrap:'break-word',tableLayout:'fixed'}}>
 <thead className='bg-dark text-light text-center'>
   <tr className='theader bg-success' >
     <th className='p-4 col-6'scope="col">Requirements</th>
     <th className='p-4' scope="col">Status</th>
     <th className='p-4' scope="col">Submitted By</th>
   <th className='p-4'scope="col">Verified By</th>
 
   </tr>
 </thead>
 <tbody>
 {
reqs.map((req)=>{
   return   <tr key={req?._id} >
   <td className="pt-4 pb-4" >{req?.requirement}</td>
   <td  className="pt-4 pb-4">{req?.Status}</td>
   <td  className="pt-4 pb-4">{req?.submittedby}</td>
   <td  className="pt-4 pb-4">{req?.verifiedby}</td>
     

 </tr>
         
         
        })} 
  
  
  
 </tbody>
</table>
<button id='btncomplete' className='btn btn-success ms-3'  onClick={()=>{complete(id,75,"Checked Requirement")}}><i className="fa-solid fa-clipboard-check fa-lg me-2"></i>Requirements Checked Completed </button>
<button id="completebtn" className='btn btn-success ms-3' onClick={()=>{complete1(id,100,"Completed")}} ><i className="fa-solid fa-download me-2 fa-lg"></i>Project Completed</button>
<button id="addbtn" className='btn btn-success ms-3' onClick={()=>{addrequirement(id)}} ><i className="fa-solid fa-download me-2 fa-lg"></i>Add Requirement</button>
 
   </div>
   
   </div>
  
<div className="modal fade" id="editbuttonmodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Comments</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
      <div className="mb-3">
<label htmlFor="edescription" className="form-label">Write Comments about what changes in requirements </label>
  <textarea type="text" className="form-control" id="edescription" name="edescription" rows="3" ></textarea>
</div>
</form>


<div id="emailHelp" className="form-text">We'll Serve you the best Experience of Requirements Elicitation Service.</div>
        
      </div>
      


        
    
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"><i className="fa-solid fa-pen-to-square me-2"></i>Update it</button>
      </div>
    </div>
  </div>
</div>
 </>;
};

export default ReqDashboard;
