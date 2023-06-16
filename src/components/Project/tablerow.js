import React,{ useRef, useState ,useEffect }  from 'react'
import { useNavigate } from 'react-router-dom';


const Tablerow = (props) => {

  const reqs= (props.req1) ;
const navigate=useNavigate();
  
 const[upreq,setUpreq]=useState();
  
 
const [id,setid]=useState(reqs);

const del=async(lid)=>{
  
  
  console.log(lid);
  if (window.confirm("Are you sure to delete?")==true) {
       const response = await fetch(`http://localhost:4000/deletereq/${lid}`, {
    method: 'DELETE', 
      headers: {
       'Content-Type': 'application/json',
       'authtoken':localStorage.getItem('token')
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     // body data type must match "Content-Type" header
   });
   //const json= response.json(); // parses JSON response into native JavaScript objects
  

  
  
   const req= await response.json(); 

   console.log(req);  
   console.log("Requirement DELETED")
//   setReq(req);
   console.log(req)
   window.location.reload();

  } else {
    
  }
 
//     const response = await fetch(`http://localhost:4000//deletereq/${id}`, {
//     method: 'DELETE', 
//      headers: {
//       'Content-Type': 'application/json',
//       'authtoken':localStorage.getItem('token')
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     // body data type must match "Content-Type" header
//   });
//   //const json= response.json(); // parses JSON response into native JavaScript objects
  
//   //alert("Hello! I am an alert box!!");
  
  
//   const req= await response.json(); 
//   // setNotes(notes.concat(note))
//   console.log(req);  
//   console.log("Requirement Viewed")
//   setReq(req);
//   console.log(req)
   
//  //' ref.current.click();
//   console.log(id)
//   navigate(`/update/${id._id}`)
 }

 const open=(lid)=>{
   setid(id);
   console.log(id._id);
  //' ref.current.click();
   console.log(id)
   navigate(`/update/${id._id}`)
}
const ref = useRef(null)

const update=  ()=>{ 

  console.log(id)

 }
const onchange=(e)=>{
  setUpreq({...upreq,[e.target.name]:e.target.value})
 }

  
  
  return (<>
    <tr>
    <td className='p-3' >{reqs?.requirement}</td>
    
    <td  className='p-3'>{reqs?.Status}</td>
    <td className='p-3'>{reqs.submittedby}</td>
    <td className='p-3'>{reqs.verifiedby}</td>
    <td><button type="button" className="btn btn-success my-3 me-2" onClick={()=>{del(reqs?._id)}} >
    <i class="fa-solid fa-trash-arrow-up"></i>Delete
  </button><button  className="btn btn-success "  onClick={()=>{open(reqs?._id)}} id="editmodel" >
  <i class="fa-solid fa-pen-to-square"></i>Edit REQ
  </button>
  <button ref ={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editbuttonmodal" style={{display:"none"}}>
  Launch demo modal
</button>
  <div className="modal fade" id="editbuttonmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Reqiorements</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="mb-3">
<label htmlFor="edescription" className="form-label">Write Updated requirement Here </label>
  <textarea type="text" className="form-control" id="edescription" name="requirement" value={upreq?.requirement} onChange={onchange}  rows="3" ></textarea>
</div>


<label htmlFor="edescription" className="form-label"  >Comments about updating requirement by REQ Engineer </label>
  <textarea type="text" className="form-control" value={upreq?.Comment} id="edescription" name="edescription" rows="3" ></textarea>


<div id="emailHelp" className="form-text">We'll Serve you the best Experience of Requirements Elicitation Service.</div>
        
      </div>
      


        
    
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success" onClick={()=>{update()}} ><i class="fa-solid fa-pen-to-square me-2 fa-lg"></i>Update Requirement</button>
      </div>
    </div>
  </div>
</div>
  </td>
 
  </tr>
  </>
  )
}

export default Tablerow