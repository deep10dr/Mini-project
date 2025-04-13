import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/result.css';
import Space from '../assets/images/space.png'
import Profile from '../Components/profile'

function Result() {
  const [outputValue, setOutputValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/result');
        setOutputValue(response.data.transcription); // Directly set the transcription
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid d-flex  align-items-center flex-column w-100 h-100">
      <div className='w-100 p-0'><Profile /></div>
      <img src={Space} alt=""  className='h-25'/>
      <div className="outer-content bg-white p-1">
        
          <legend className="text-center" style={{fontWeight:'800'}}>Transcription text</legend>
          <textarea value={outputValue} readOnly className="w-100" />
    
      </div>
    </div>
  );
}

export default Result;

