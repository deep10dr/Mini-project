import React from 'react';
import '../assets/css/Error.css';
import { useNavigate } from 'react-router-dom';
import { FaCircleArrowLeft } from "react-icons/fa6";
import Catimg from '../assets/images/10000_1_05.png'

function Error() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center flex-column w-100" style={{ height: '100vh',backgroundImage: `url({Catimg})` }}>
      <p className="error-text text-center ">404 Error!</p>
      
      <div className="outer-div d-flex justify-content-center align-items-center  ">
      <img src={Catimg} alt="Error Cat" className="error-loader " />

      </div>
      <button
        className="back-btn p-2 d-flex justify-content-center align-items-center mt-1"
        onClick={() => navigate('/')}
      >
        <FaCircleArrowLeft className="me-2" /> Home
      </button>
    </div>
  );
}

export default Error;
