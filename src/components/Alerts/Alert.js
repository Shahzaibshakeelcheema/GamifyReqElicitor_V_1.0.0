import React, {useEffect} from 'react'
import {Link, useRef} from 'react-router-dom'

const Alert = (props) => {
  const msg=props.message;
  
  useEffect(() => {
    setTimeout(()=>{ document.getElementById("alert").style.display = "none";
   
    }, 2200);
   
   
    }
  , [])
  
  
  return (
    <>
    
    <div id="alert" className="alert alert-warning alert-dismissible " role="alert">
  <strong>Warning!</strong> Still on beta stage.
  {msg}
</div>
    
    </>
  )
}

export default Alert