import React,{useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar'
import SideNav from '../Navbar/SideNav'

const Pdashboard = () => {
const[req,setReq]=useState()
  const getreq=async()=>{
    const response = await fetch(`http://localhost:4000/req`, {
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
    setReq(json)
  }

useEffect(() => {
 

  
    getreq()
  
}, [])


  return (<>
    <Navbar/><div className='container-fluid  row '>
      
    <SideNav/>
    <div className=' col-10 '>
      
        <h1 className='m-5 text-success'><b>POINTS</b>
        <br></br>___________</h1>
        <table className=" table table-striped " style={{wordWrap:'break-word',tableLayout:'fixed'}}>
    <thead className='bg-success text-light text-center'>
      <tr  >
        <th className='p-4 col-8'scope="col">Requirements</th>
        <th className='p-4' scope="col">Status</th>
        <th className='p-4' scope="col">Points</th>
    
      </tr>
    </thead>
    <tbody>
     {req?.map((reqs)=>{
  return   <tr>
<th className='p-3' scope="row">{reqs.requirement}</th>
<td  className='p-3'>{reqs.Status}</td>
<td  className='p-3'>{reqs.point}</td>
 
</tr>}
     )}
    
      
    </tbody>
   </table>
   <button className='btn btn-success m-4'><i class="fa-solid fa-download  me-2 fa-lg"></i>Download Document</button>
   <button className='btn btn-success ms-3'><i class="fa-solid fa-clipboard-check me-2 fa-lg"></i>Requirements Completed </button>
      </div>
      </div>
      
     
    </>
  )
}

export default Pdashboard