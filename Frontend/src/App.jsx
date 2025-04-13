import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Starter from './pages/Start.jsx';
import Record from './pages/Record.jsx';
import ErrorPage from './pages/Error.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx'
import Result from './pages/result.jsx'
import User from './pages/user.jsx'
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css"; 
import Daily_news from './pages/daily_news.jsx';
import Question from './pages/question.jsx';
function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, [])

  return (
    <div className='container-fluid outer-class w-100 h-100 d-flex justify-content-center align-items-center'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Starter />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/record' element={sessionStorage.getItem('user')? <Record/> : <Navigate to="/login" />} />
          <Route path='/result' element={sessionStorage.getItem('user')?<Result/>: <Navigate to='/login'/>} />
          {/* <Route path='/user' element={sessionStorage.getItem('user')?<User/>:<Navigate  to = '/login' /> }/> */}
          <Route path='/user' element={<User />} />
          <Route path='/question' element={<Question />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/daily' element={<Daily_news/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
