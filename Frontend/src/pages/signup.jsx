import '../assets/css/signup.css';
import kitty from '../assets/images/cutty-2.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Profile from '../Components/profile'

function Signup() {
  const navigate = useNavigate();
  const [value, setValue] = useState({ name: '', email: '', password: '', confirmPassword: '', agree: false });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value: inputValue, type, checked } = e.target;
    setValue((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : inputValue }));
  }

  function validateForm() {
    let newErrors = {};

    // Name Validation
    if (!value.name.trim()) {
      newErrors.name = "Name is required!";
    } else if (value.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long!";
    }

    // Email Validation
    if (!value.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      newErrors.email = "Invalid email format!";
    }

    // Password Validation
    if (!value.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (value.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    }

    // Confirm Password Validation
    if (value.confirmPassword !== value.password) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    // Agree Checkbox Validation
    if (!value.agree) {
      newErrors.agree = "You must agree to the terms!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

   async function  handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {  
        try{
            const  senddata =  await axios.post("http://localhost:5000/signup",value);
             if(senddata.data == 'ok'){
              setValue({ name: '', email: '', password: '', confirmPassword: '', agree: false });
              Swal.fire("Success", "Account Created Successfully", "success"); 
                if( !sessionStorage.getItem('user')){
                  sessionStorage.setItem('user', JSON.stringify({ name: value.name, email: value.email }));
                    window.location.href = "/record"; 
                }
             }
             else if(senddata.data =='found'){
              Swal.fire("Email Found", "Try Another Email", "error");
             }
             else{
              Swal.fire("error", "Account not created", "error");
             }
            }
        catch(error){
          alert(error);
        }  

    } 
  }

  return (
    <div className='container-fluid w-100 h-100 d-flex flex-column align-items-center'>
      <div className='w-100 p-0'><Profile /></div>
      <img src={kitty} alt="Kitty" className='h-25' />

      <div className="login-outer p-3 shadow-lg">
        <h2 className="text-center mb-2" style={{ fontWeight: 700 }}>Sign Up</h2>
        <form className="w-100 p-3 d-flex flex-column align-items-center" onSubmit={handleSubmit}>

          {/* Name Input */}
          <div className='w-100 mb-3'>
            <input
              type="text"
              name="name"
              className='form-control'
              placeholder='Enter Your Name'
              value={value.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-danger small">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div className='w-100 mb-3'>
            <input
              type="email"
              name="email"
              className='form-control'
              placeholder='Enter Your Email'
              value={value.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-danger small">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className='w-100 mb-3'>
            <input
              type="password"
              name="password"
              className='form-control'
              placeholder='Enter Password'
              value={value.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-danger small">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className='w-100 mb-3'>
            <input
              type="password"
              name="confirmPassword"
              className='form-control'
              placeholder='Confirm Password'
              value={value.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="text-danger small">{errors.confirmPassword}</p>}
          </div>

          {/* Agree Checkbox */}
          <div className='w-100 mb-3 d-flex align-items-center'>
            <input
              type="checkbox"
              name="agree"
              className='me-2'
              checked={value.agree}
              onChange={handleChange}
            />
            <label>I agree to the <a href="#">Terms & Conditions</a></label>
          </div>
          {errors.agree && <p className="text-danger small">{errors.agree}</p>}

          {/* Signup Button */}
          <button type="submit" className="btn btn-primary w-50" >Sign Up</button>

          {/* Login Link */}
          <p className='small-text mt-3'>
            Already have an account? <a href="#" onClick={() => navigate('/login')}>Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
