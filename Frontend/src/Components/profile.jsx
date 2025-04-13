import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

function Profile() {
    const [value, setValue] = useState({ name: '', email: '' });

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            const data = JSON.parse(sessionStorage.getItem('user'));
            setValue({ name: data.name, email: data.email });
        }
    }, []);

    return (
        <div className='container-fluid d-flex align-items-center justify-content-end h-100 w-100 p-1'>
            <img
                src={value.name ? 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png' : 'https://cdn-icons-png.flaticon.com/128/149/149071.png'}
                alt="User Image"
                data-tooltip-id="userTooltip" // Tooltip reference
                data-tooltip-content={value.name ? value.name : "Unknown User"} // Tooltip text
                style={{ cursor: 'pointer', height: '30px' }}
                className=''
                onClick={()=>{
                    window.location.href='/user'
                }}
            />
            <Tooltip id="userTooltip" place="left" effect="solid" />
        </div>
    );
}

export default Profile;
