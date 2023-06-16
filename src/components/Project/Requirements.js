import React ,{ useEffect,useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
//import { set } from '../../../backend/Router/Router';
import Navbar from '../Navbar/Navbar';
import SideNav from '../Navbar/SideNav';
import Tablerow from './tablerow';

const Requirements = () => {
 const navigate=useNavigate();
 const reqtinitial=[
        
]
  const[reqs, setReq]= useState(reqtinitial);
  const [reqid,setReqid]=useState()
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
  e.preventDefault();
  const response = await fetch(`http://localhost:4000/updaterequirement/${reqid}`, {
  method: 'PUT', 
   headers: {
    'Content-Type': 'application/json',
    'authtoken':localStorage.getItem('token')
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  // body data type must match "Content-Type" header
  body: JSON.stringify({requirement:upreq?.requirement}) // body data type must match "Content-Type" header
});
//const json= response.json(); // parses JSON response into native JavaScript objects

//alert("Hello! I am an alert box!!");


const req= await response.json(); 
// setNotes(notes.concat(note))
console.log(req);  
console.log("Requirement Viewed")
setUpreq(req);
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
  }else{
   navigate('/login')
  }
  // eslint-disable-next-line 
 }, [])


  return <>
   <Navbar/><div className='container-fluid row  '>
  <SideNav/>
 
  <div className=' col-10 '>
     
      <h2 className='m-5 text-success'><b>Submitted Requirements</b><br></br>_____________</h2>
      <table className=" table table-striped" style={{wordWrap:'break-word',tableLayout:'fixed'}}>
  <thead className='bg-dark text-light text-center'>
    <tr  className='bg-success'>
      <th className='p-4 col-6'>Requirements</th>
      <th className='p-4' >Status<br></br>( Verified,<br></br>Pending,<br></br>Updated)</th>
      <th className='p-4'>Submitted By</th>
    <th className='p-4'>Verified By</th>
    <th className='p-4 col-2'>Edit</th>
    </tr>
  </thead>
  <tbody>
  {
reqs.map((req)=>{
   return  <Tablerow key={req?._id} req1={req}/>
   
         
         
        })} 
  
  
  

  
  </tbody>
</table>




    </div>
    </div>
  </>;
};

export default Requirements;
