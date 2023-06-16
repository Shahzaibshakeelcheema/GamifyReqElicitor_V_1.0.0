
import Navbar from '../Navbar/Navbar'
import SideNav from '../Navbar/SideNav'
import Points from '../Points/Points'
import React ,{ useEffect,useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import Tablerow from '../Project/tablerow';
const Pprogress = () => {



  const navigate=useNavigate();
  const reqtinitial=[
         
 ]
   const[reqs, setReq]= useState(reqtinitial);
   const [project,setProject]=useState()
   const {id}=useParams();
 
   const[upreq,setUpreq]=useState()  
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
  }
 //useEffect(()=>{getreq()}
 //,[]);
 
 const openupdate=(reqid)=>{
   
   console.log(reqid);
   //setUpreq(reqid)
 }
 
 const update= async (e,reqid)=>{ 
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
  
  
  const req= await response.json(); 
  // setNotes(notes.concat(note))
  console.log(req);  
  console.log("Requirement Viewed")
  setProject(req);
  console.log(req)
  }
 const onchange=(e)=>{
   setUpreq({...upreq,[e.target.name]:e.target.value})
  }
 //useEffect(()=>{getreq()}
 //,[]);
 
 useEffect(() => {
      
   if(localStorage.getItem('token')&& localStorage.getItem('token')){
     getreq() 
     update()    
   }else{
    navigate('/login')
   }
   // eslint-disable-next-line 
  }, [])



  return (
    <>
  <Navbar/><div className='container-fluid row  '>
  <SideNav/>
  <div className=' col '>
    <div className='row'>
        
     <div className='col-3 m-lg-5 py-4 bg-success text-light'>
        <h4><b>No of Requirements</b></h4>
        <h3><b>{reqs.length}</b></h3>
     </div>
     <div className='col-3 m-5 py-4 bg-success text-light'>
        <h4><b>Project Status</b></h4>
        <h3><b>{project?.Status}</b></h3>
     </div>
     <div className='col-3 m-5 py-4 bg-success text-light'>
        <h4><b>Project Progress</b></h4>
        <h3><b>{project?.Progress}%</b></h3>
     </div>
    </div>
    <table className=" table table-striped" style={{wordWrap:'break-word',tableLayout:'fixed'}}>
  <thead className='bg-dark text-light text-center'>
    <tr  className='bg-success'>
      <th className='p-4 col-6'>Requirements</th>
      <th className='p-4' >Status<br></br>( Verified,<br></br>Pending,<br></br>Updated)</th>
      <th className='p-4'>Submitted By</th>
    <th className='p-4'>Verified By</th>
 
    </tr>
  </thead>
  <tbody>
  {
reqs.map((req)=>{
   return   <tr>
   <td className='p-3' >{req?.requirement}</td>
   
   <td  className='p-3'>{req?.Status}</td>
   <td className='p-3'>{req.submittedby}</td>
   <td className='p-3'>{req.verifiedby}</td>
   

 </tr>
   
         
         
        })} 
  
  
  

  
  </tbody>
</table>


        </div>



  
    </div>

    

  </>
  )
}

export default Pprogress