import React, {useEffect,useState} from 'react';
import Alert from '../Alerts/Alert';

import Progressbar from '../Progressbar/Progressbar';

import './Points.css';
const Points = () => {
 
 let lvlpercentage=0;
 let lpercent=0;
 let Rpercent;
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
 setPoints(pjson)
 console.log(points)

}
 
 useEffect(() => {
  
  getpoint()
  
 
   
 }, [])
 
 const pointcheck=async()=>{
 if (points?.Level==='No Level'){
  lvlpercentage=0;
  lpercent=points.point/10;
  Rpercent=points?.Ranks*25;
}else if (points?.Level==='One'){
  lvlpercentage=30;
  Rpercent=points?.Ranks*25;
 console.log(points?.point-100)
  lpercent= ( (points?.point-100))*2;
  console.log(lpercent);
}else if (points?.Level==='Two'){
  lvlpercentage=60;
  Rpercent=points?.Ranks*25;
  lpercent=(points?.point-150)*2;
}else{
  lvlpercentage=90;
  Rpercent=points?.Ranks*25;
  lpercent=(points?.point-200)*2;
}}
pointcheck()

 return<> 
  
  <div className='container-fluid mt-5 '>

  
    <h3 className='col-4 text-start text-success'><b>Progress Overview Board</b></h3>
    <div className='row pointsborder' >
      
  <div className="col-4"><Progressbar percentage={lvlpercentage} color={'red'} name={ `Level `} fig={ points?.Level}/></div>

  <div className="col-4"><Progressbar percentage={lpercent} color={'#e6ac00'} name={`POINTS `} fig={points?.point}/></div>

  <div className="col-4"><Progressbar percentage={Rpercent} name={'RANKS'} fig={points?.Ranks}/></div>



  </div>

  </div>
  </>
};

export default Points;
