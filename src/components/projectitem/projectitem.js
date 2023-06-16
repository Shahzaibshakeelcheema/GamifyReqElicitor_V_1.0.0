import { useRef ,useState } from "react"
import { useNavigate ,useLocation} from "react-router-dom"
import './projectitem.css'
import pimage from './pimage.png'
// import Project from "../Project/project"
const Projectitem = (props) => {

  const project= (props.project1);
  const location=useLocation();
 const [user,setUser]=useState();
   const users=props.user;
   const navigate= useNavigate()
  const update=(pid)=>{
 navigate(`/updateproject/${pid}`)
console.log(pid)
  }
  
   const updateNote=async(pid)=>{
   console.log(pid)
   if (window.confirm("Are you sure to delete?")===true) {
   const response = await fetch(`http://localhost:4000/deleteproject/${pid}`, {
    method: 'DELETE', 
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
  console.log(json);
  window.location.reload();
  
   }}
   
  const ref = useRef(null)
  
  //const project=props.projects;
  const cardclick =async()=>{
    const response = await fetch(`http://localhost:4000/getuser/`, {
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
   console.log(json._id);
   setUser(json)
   const id=json._id;
console.log(project.reqeng)
//navigate(`/project/${project._id}`)  

if(location.pathname==='/'){
if(id===project.reqeng){
  
    navigate(`/reqrequirements/${project._id}`,{project1:project});
  console.log(project?.Status)  
   }else if(id===project.enduser){
    navigate(`/project/${project._id}`)
   }else{
    navigate(`/reqrequirements/${project._id}`);
   }
  }else if(location.pathname==='/ProjectProgress'){
    navigate(`/ProjectProgress/${project._id}`);
  }
    
   
    console.log('clicked')
    
    
    

  }
  
  
  
  
    return (<>
        <div className='col-md-4 my-5'>
        <div className="card cardstyle py-4" >
        <div className="secdiv ">
       <img src={pimage} alt="" />
        </div>
       <span className=' mt-3 ms-2 '  style={{display: users?.type=='PM' ? 'block' : 'none'}}><i className="fa-solid fa-bars-progress fa-xl"></i><b> Project</b><i id="update" className='row py-2 fa-xl justify-content-end me-5 fa-solid fa-file-pen' style={{marginTop:'-20px', color:'white'}} onClick={()=>{update(project._id)}}></i><i id="del" className="row py-2 fa-solid fa-trash-can-arrow-up fa-xl justify-content-end me-3" style={{marginTop:'-18px', color:'white'}} onClick={()=>{updateNote(project._id)}}></i></span>
       <i onClick={()=>{cardclick()}}>
<div className="card-body cbody text-start">
  <p className="card-title" style={{fontSize:"17px"}}><b> {project?.Title}</b></p>
  <p className="card-text" style={{fontSize:"15px"}}> {project?.Desc}</p>
  <p style={{fontSize:"0.8vw"}}>Project: {project?.Tag}</p>
 
 
  <div className="progress  pbar">
  <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{width: `${project?.Progress}%`}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
</div>
</div>
</i>
</div>

      </div>
      <button ref ={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:"none"}}>
  Launch demo modal
</button>


<div className="modal fade modalalign" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header " style={{backgroundColor:"#E2E7A8"}}>
        <h5 className="modal-title p-3" id="exampleModalLabel">Project Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        


      
  <div className="mb-3 my-4">
    <p className="ms-3 text-start"><strong>Project Title :</strong></p>
    <p className="pdetail">{project?.Title}</p>
   
   
  </div>
  
  <div className="mb-3">
<p className="ms-3 text-start"><strong>Project Description :</strong></p>

<p className="pdetail">{project.Desc}</p>
  
</div>
  <div className="mb-3">
  <p className="ms-3 text-start"><strong>Project Tag :</strong></p>

    <p className="pdetail">{project.Tag}</p>
   
  </div>    




<div className="mb-3">
<p className="ms-3 text-start"><strong>Project Status :</strong></p>
    
    <p className="pdetail">{project.Status}</p>
   
  </div>

 
  
 



<div id="emailHelp" className="form-text">We'll Serve you the best Requirements Elicitation Service.</div>
        
      </div>
      <div className="modal-footer">
        <button  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
















      </>
    )
}

export default Projectitem
