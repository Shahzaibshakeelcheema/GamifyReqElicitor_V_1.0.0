import React,{ useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import SideNav from '../Navbar/SideNav';

const LeaderBoard = () => {

  const [gamify, setGamify]=useState();

useEffect( async() => {
  const response = await fetch(`http://localhost:4000/leaderboard`, {
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
  setGamify(json)

  
}, [])



  return <>
   <Navbar/>
           <div className='container-fluid row  '>
  <SideNav/>
  <div className=' col-10 '>
  <h1 className='m-5 text-success'><b>LeaderBoard</b><br></br>_____________</h1>
     
      <table className=" table table-striped">
  <thead className='bg-success text-light text-center'>
    <tr  >
      <th className='p-4'scope="col">#</th>
      <th className='p-4'scope="col">Name</th>
      <th className='p-4' scope="col">User Level</th>
      <th className='p-4' scope="col">Points</th>
      <th className='p-4' scope="col">Ranks</th>
    </tr>
  </thead>
  <tbody>
  
  {gamify?.map((gam)=>{
return   <tr>
<th className='p-3' scope="row">{gam?.no}</th>
<td className='p-3'>{gam?.fname+" "+gam?.lname}</td>
<td className='p-3'>{gam?.userlevel}</td>
<td className='p-3'>{gam?.points}</td>
<td className='p-3'>{gam?.Ranks}</td>
</tr>
  })}
  
   
  </tbody>
</table>
  </div>
  </div>

  </>;
};

export default LeaderBoard;
