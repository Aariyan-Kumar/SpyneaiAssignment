import React from 'react';
import { Signup as SignupComponent } from '../components/index';
import loginimg from '../assets/login.svg'


function Signup() {
    return (
        <div className='flex flex-wrap justify-center py-10 bg-gray-200'>
            <img className='w-4/12 bg-indigo-500 rounded-l-lg' src={loginimg} alt="login img" />
            <SignupComponent />
        </div>
    )
}

export default Signup
