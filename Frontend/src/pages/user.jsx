import React, { useEffect, useState } from 'react';
import '../assets/css/user.css';
import Url from '../assets/images/open_view.png';

// Import necessary icons
import { IoSettingsOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";

// Import AOS for animations
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';

function User() {
    const [value, setValue] = useState({ name: '', email: '' });

    useEffect(() => {
        AOS.init(); // Initialize AOS for animations

        const userData = sessionStorage.getItem('user');
        if (userData) {
            try {
                const data = JSON.parse(userData);
                setValue({ name: data.name, email: data.email });
            } catch (error) {
                console.error("Error parsing sessionStorage data:", error);
            }
        }
    }, []);

    function logoutUser() {
        if (sessionStorage.getItem('user')) {
            Swal.fire({
                title: "Are you sure?",
                text: "You will be logged out!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Logout",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.removeItem('user');
                    Swal.fire("Logged Out!", "You have been logged out successfully.", "success").then(() => {
                        window.location.href = "/login"; // Redirect to login page
                    });
                }
            });
        } else {
            Swal.fire({ title: "No Active Session",
              text: "Please Login in First",
              icon: "info",
              showCancelButton: true,
              cancelButtonColor: "#3085d6",
              confirmButtonColor: "#d33",
              
              cancelButtonText: "Cancel",
              confirmButtonText: "Login in"}).then((result)=>{
                if(result.isConfirmed){
                  window.location.href = "/login"; 
                }
              })
        }
    }

    return (
        <div className='container-fluid h-100 w-100 d-flex align-items-center flex-column'>
            <img src={Url} alt="User Profile" className='h-25' />
            
            <div className='inner-div container-fluid d-flex justify-content-center align-items-center flex-column p-1'>
                <div className='container-fluid w-100 d-flex justify-content-center p-0 m-0'>
                    <img src="https://cdn-icons-gif.flaticon.com/17644/17644526.gif" alt="Profile Icon" className='profile-img p-0 m-0'/>
                </div>

                <div className='container-fluid w-100 h-75 m-0'>
                    <p className='text-black text-center' style={{ fontWeight: '600', fontSize: '24px' }}>
                        {value.name ? `Hi ${value.name}` : 'Unknown'}
                    </p>
                    <div className="w-100 p-1 m-0" data-aos="fade-right">
                        <dl>
                            <dt>Settings <IoSettingsOutline className="ms-1"/></dt>
                            <dd className='ms-2'>Account Management <FaExternalLinkAlt className="float-end" /></dd>
                            <dd className='ms-2'>Social Permission <FaExternalLinkAlt className="float-end" /></dd>
                            <dd className='ms-2' >Privacy and Data <FaExternalLinkAlt className="float-end" /></dd>

                            <dt>Login <RiLoginBoxLine className="ms-1" /></dt>
                            <dd className='ms-2'>Security <FaExternalLinkAlt className="float-end" /></dd>
                            <dd className='ms-2' onClick={logoutUser} style={{ cursor: 'pointer' }}>
                                Log Out <FaExternalLinkAlt className="float-end text-danger" />
                            </dd>

                            <dt>Support <MdSupportAgent className="ms-1"/></dt>
                            <dd className='ms-2'>Help Center <GrFormNextLink className="float-end" /></dd>
                            <dd className='ms-2'>Terms of Service <GrFormNextLink className="float-end" /></dd>
                            <dd className='ms-2'>About <GrFormNextLink className="float-end" /></dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
