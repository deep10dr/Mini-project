import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GrNext } from 'react-icons/gr';
import '../assets/css/Start.css';
import Profile from '../Components/profile'

function Start({ buttonText = "Start" }) {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/Record');
  };

  return (
     <div className='container-fluid m-0 p-0  h-100 w-100'>
        <div className='w-100 p-0'><Profile /></div>
       <div className="container-fluid start-class d-flex align-items-center justify-content-center flex-column h-100  w-100 ">
      <div className="inner-content d-flex " data-aos="zoom-out-down" data-aos-delay="500">
        <p className="titel-content">DocAssist</p>
        <img
          src="https://cdn-icons-png.flaticon.com/128/15536/15536380.png"
          alt="Doctor Icon"
          className="ms-2 doc-img"
        />
      </div>
      <div
        className="start-btn d-flex align-items-center justify-content-center p-0 m-0 text-center mt-5 "
        aria-label="Start the process"
        title="Start"
        onClick={handleStartClick}
      >
        <GrNext className="next-btn ms-2" size={40} />
        <p className="m-0 me-2 st-p">{buttonText}</p>
      </div>
    </div>
     </div>
   
  );
}

export default Start;
