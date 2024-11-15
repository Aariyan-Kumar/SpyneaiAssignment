import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/authService';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {

    const dispatch = useDispatch();                 
    const navigate = useNavigate();

    const handelLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
        }).catch((error) => {
            console.log("The Error is in the Logout :: ", error)
        }).finally(() => {
            navigate('/login')
        })
    }
    return (
        <>
            <button
                type="button"
                className="hover:text-blue-500 transition duration-150 ease-in-out text-white focus:text-blue-600"
                onClick={handelLogout}
            >
                Logout
            </button>
        </>
    )
}

export default LogoutBtn
