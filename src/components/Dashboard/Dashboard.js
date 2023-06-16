import React, {useEffect , useState} from 'react';
import Navbar from '../Navbar/Navbar';
import SideNav from '../Navbar/SideNav';
import Points from '../Points/Points';
import Projectitem from '../projectitem/projectitem';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '../Alerts/Alert';

const Dashboard = () => {
    const navigate= useNavigate()

     const projectinitial=[
        
     ]
     const location= useLocation();
     console.log(location.pathname);

//     const [project, setProject]= useState({id:"",Title:"",Desc:"",tag:"default",Status:"",createdby:"",enduser:"",reqeng:""})useState(projectinitial);
    const [projects, setProjects] =useState(projectinitial);
    const [user, setUser] =useState();
 
     const getproject =async (e)=>{
      //TODO api Call
      const response = await fetch(`http://localhost:4000/fetchallproject`, {
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
     setProjects(json.project)
     setUser(json.user)
     if(json.user.type=='PM'){
      document.getElementById("addproject").style.display = "block";
     }
    
     }
     useEffect(() => {
     
      if(localStorage.getItem('token')&& localStorage.getItem('token')){
       getproject()   
       if(location.pathname=='/ProjectProgress'){
        const h1= document.getElementById("point");
        
        h1.remove();
      //  const h2= document.getElementById("addproject");
      document.getElementById("addproject").style.display = "none";
        console.log(h1)
      //  h2.remove();
       // window.location.reload();
     
       }
       
       
      
      }else{
       navigate('/login')
      }
      // eslint-disable-next-line 
     }, [])
     
 

  return  <>
  <Navbar/><div className='container-fluid row  '>
  <SideNav/>
  <div className=' col mt-3'>
  
    <div id="point"><div><Points/></div></div>
      <div className='row mt-3 pt-4'>
<div  className='col-3 text-start ms-4'>  <h3 className='text-success'><b>Your Projects</b></h3></div>
<div id='addproject' style={{display:"none"}} className='col-8'><button className='col-2 offset-md-11 btn btn-success ' onClick={()=>{navigate('/addproject')}}><i className="fa-solid fa-file-circle-plus me-2 "></i>Add Project</button> </div></div>
 

<div className='row my-3 ms-5'>

{
projects.map((project)=>{
   return   <Projectitem key={project._id}  project1={project} user={user}/>
         
         
        })} 
  

        </div>



  
    </div>

    
  </div>
  </>
};

export default Dashboard;
