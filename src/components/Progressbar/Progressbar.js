import React from 'react';
import './Progress.css'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Progressbar = (props) => {
  const percentage = 40; 
return <>
<CircularProgressbar className='check ' value={props.percentage} text={props.fig/*`${props.percentage}%`*/} styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: '',

    // Text size
    textSize: '14px',
    
  
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: props.color,//`rgba(62, 152, 199, ${percentage / 100})`,
    textColor: props.color,
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
  })}/>
      <h5 style={{marginTop:"-22px"}}> <b>{ props.name}</b></h5>
  <br></br>
  
  </>
};

export default Progressbar;
