import React from 'react'
import { Login as LoginComponent } from '../components/index'
import loginimg from '../assets/login.svg'

function Login() {
    return (
        <div className='flex flex-wrap justify-center py-10 bg-gray-200'>
            <img className='w-4/12 bg-indigo-500 rounded-l-lg' src={loginimg} alt="login img" />
            <LoginComponent />
        </div>
    )
}

export default Login
