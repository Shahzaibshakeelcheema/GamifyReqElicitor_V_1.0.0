import React, {useState, useEffect}from 'react'
import Navbar from '../Navbar/Navbar'
import SideNav from '../Navbar/SideNav'
import logo3 from '../RANK-ONE.jpg';
import logo1 from '../LEVEL-one.jpg';
import logo from '../LEVEL-TWO.jpg';
import logo2 from '../LEVEL-THREE.jpg';
import logo4 from '../RANK-TWO.jpg';
import logo5 from '../RANK-THREE.jpg';

const Achievments = () => {




    const [points, setPoints]=useState();
 
 const getpoint =async()=> {
  const response= await fetch(`http://localhost:4000/getpoints`, {
   method: 'GET', 
    headers: {
     'Content-Type': 'application/json',
     'authtoken':localStorage.getItem('token')
     // 'Content-Type': 'application/x-www-form-urlencoded',
   },
   // body data type must match "Content-Type" header
 }) 
 const pjson= await response.json()
 console.log(pjson)
 await setPoints(pjson)
 console.log(pjson.Level)
 if (pjson.Level==="One"){
    document.getElementById('one').style.display='block';
 }else if(pjson.Level==="Two"){
    document.getElementById('two').style.display='block';
    document.getElementById('one').style.display='block';
 }else if(pjson.Level==="three"){
    document.getElementById('two').style.display='block';
    document.getElementById('one').style.display='block';
    document.getElementById('three').style.display='block';
 }
 if (pjson.Ranks===1){
    document.getElementById('four').style.display='block';
 }else if(pjson.Ranks===2){
    document.getElementById('four').style.display='block';
    document.getElementById('five').style.display='block';
 }else if(pjson.Ranks===3){

    document.getElementById('four').style.display='block';
    document.getElementById('five').style.display='block';
    document.getElementById('six').style.display='block';
 }
}


 
 useEffect(() => {
  
  getpoint()
  
 
   
 }, [])







  return (<>
    <Navbar/><div className='container-fluid row  '>
    <SideNav/>
    <div className=' col-10  '>
    <h3 className='text-center mt-5 mb-4 ms-4 text-success'>
    <i className="fa-solid fa-trophy  mb-4 fa-2x"></i>
     <br></br> <h1><b>Achievements</b></h1>
       _________</h3>
     
       
       <div className='row justify-content-center'>
  <div id='one' className='col-3 mb-4   bg-success ' style={{marginTop:"170px",display:"none"}}>
<img alt="" width={250} height={250} style={{ outline: "2px solid red",  outlineOffset: "10px", marginTop:"-120px"}} src={logo1}></img>
<h4 className='my-4 text-light'><b>LEVEL ONE</b></h4>

  </div>
  <div id='two' className='col-3  mb-4  bg-success text-light' style={{marginTop:"170px",marginLeft:"20px",display:"none"}}>
<img alt="" width={250} height={250} style={{ outline: "2px solid red",  outlineOffset: "10px", marginTop:"-120px"}} src={logo}></img>
<h4 className='my-4'><b>LEVEL TWO </b></h4>

  </div>
  <div id='three' className='col-3  mb-4  bg-success text-light' style={{marginTop:"170px",marginLeft:"20px",display:"none"}}>
<img alt="" width={250} height={250} style={{ outline: "2px solid red",  outlineOffset: "10px", marginTop:"-120px"}} src={logo2}></img>
<h4 className='my-4'><b>LEVEL THREE</b></h4>

  </div>
  <div id='four' className='col-3   bg-success mb-4  text-light' style={{marginTop:"170px",marginLeft:"20px",display:"none"}}>
<img alt="" width={250} height={250} style={{ outline: "2px solid red",  outlineOffset: "10px", marginTop:"-120px"}} src={logo3}></img>
<h4 className='my-4'><b>RANK ONE</b></h4>

  </div>
  <div id='five' className='col-3   bg-success mb-4 text-light' style={{marginTop:"170px",marginLeft:"20px",display:"none"}}>
<img alt="" width={250} height={250} style={{ outline: "2px solid red",  outlineOffset: "10px", marginTop:"-120px"}} src={logo4}></img>
<h4 className='my-4 text-light'><b>RANK TWO</b></h4>

  </div>
  <div id='six' className='col-3   bg-success mb-4 text-light' style={{marginTop:"170px",marginLeft:"20px",display:"none"}}>
<img alt="" width={250} height={250} style={{ outline: "2px solid red",  outlineOffset: "10px", marginTop:"-120px"}} src={logo5}></img>
<h4 className='my-4 '><b>RANK THREE</b></h4>

  </div>
       </div>
       
       
       </div>
       
       </div>
       </>
  )
}

export default Achievments