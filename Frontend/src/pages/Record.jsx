import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/Record.css';
import { FaMicrophone, FaMicrophoneAlt, FaArrowDown } from "react-icons/fa";
import rec from '../assets/gifs/record.gif';
import { MdDelete } from "react-icons/md";
import { IoMdCloudUpload } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
import Swal from 'sweetalert2';
import CatImg from '../assets/images/4500_7_07.png';
import Profile from '../Components/profile'
function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [timer, setTimer] = useState(0);
  const [sendingBtn, setBtn] = useState(<IoMdCloudUpload className='size-20 ms-1' />);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const getPermission = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      Swal.fire("Error", "MediaRecorder is not supported in this browser.", "error");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        audioChunks.current = [];
      };

      setIsRecording(true);
      mediaRecorderRef.current.start();
      startTimer();
    } catch (err) {
      Swal.fire("Error", "Error accessing the microphone: " + err.message, "error");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  };

  const startTimer = () => {
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const deleteAudio = () => {
    Swal.fire({
      text: 'Are you sure you want to delete this audio?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        setAudioBlob(null);
        setAudioUrl(null);
        setIsPlaying(false);
        Swal.fire("Deleted", "Audio deleted successfully", "success");
      }
    });
  };

  const uploadAudio = async () => {
    if (!audioBlob) {
      Swal.fire("Error", "No audio recorded", "error");
      return;
    }

    try {
      setBtn(<span className="spinner-border spinner-border-sm"></span>);
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.webm");

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        Swal.fire("Success", "Audio uploaded successfully!", "success");
      } else {
        Swal.fire("Error", "Upload failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error uploading audio", "error");
    } finally {
      setBtn(<IoMdCloudUpload className='size-20 ms-1' />);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="record-container w-100 h-100 container-fluid p-0 m-0 d-flex justify-content-center align-items-center flex-column">
        <div className='w-100 p-0'><Profile /></div>
      <div className="container-fluid d-flex align-items-center rec-inner flex-column">
        <img src={CatImg} alt="" className='h-25' />
        <div className='container d-flex justify-content-center align-items-center flex-column inner-mic-class p-lg-5 p-sm-3 p-4' data-aos="zoom-in">
          <div className="text-sayer mb-5 d-flex flex-column justify-content-center align-items-center text-dark">
            {isRecording ? (
              <div className='d-flex justify-content-center align-items-center text-dark'>
                Recording... <img src={rec} alt="Recording indicator" className="rec-img" />
              </div>
            ) : "Click to record"}
            <FaArrowDown className="mt-2 mb-3" />
          </div>

          <div className={`mic-div d-flex ${isRecording ? 'mic-fix' : ''} justify-content-around align-items-center`} role="button" onClick={isRecording ? stopRecording : getPermission}>
            <div>{isRecording ? <FaMicrophoneAlt className="mic-img" /> : <FaMicrophone className="mic-img" />}</div>
            <div className={`fs-2 ms-1 ${isRecording ? 'd-flex' : 'd-none'}`}>{formatTime(timer)}</div>
          </div>

          {audioBlob && (
            <div className="mt-3 d-flex flex-column align-items-center">
              {/* Play/Pause Button */}
              <div className="audio-controls mb-3">
                <button className="play-btn me-2" onClick={togglePlayPause}>
                  {isPlaying ? <FaPause className='size-20' /> : <FaPlay className='size-20' />}
                </button>
                <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
              </div>

              {/* Delete and Upload Buttons */}
              <div className="d-flex justify-content-around p-2">
                <button className="me-2 btn-delete" onClick={deleteAudio}>
                  Delete <MdDelete className='size-20' />
                </button>
                <button className="send-btn d-flex justify-content-center align-items-center" onClick={uploadAudio}>
                  Submit {sendingBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Record;
