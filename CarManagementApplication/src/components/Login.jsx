import React, { useState } from 'react';
import authService from '../appwrite/authService';
import { Link, useNavigate } from 'react-router-dom';
import { login as storeAuthLogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { Input } from './index'
import { useForm } from 'react-hook-form'

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setErr] = useState("");



    const login = async (data) => {
        setErr("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            // console.log(session);
            if (session) {
                authService.getCurrentUser().
                    then((userData) => {
                        dispatch(storeAuthLogin(userData));
                        navigate("/");
                    })
            }
        } catch (error) {
            setErr(error.message || 'Invalid email or password');
        }
        setLoading(false);
        //console.log(data);
    }



    return (
        <div className="w-4/12 rounded-r-lg bg-gradient-to-r from-indigo-500 to-cyan-500 p-6 shadow-4 pt-14">
            <h2 className='text-2xl mb-4 text-center'>Login</h2>
            {error && <p className='text-red-600 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)}>
                {/* <!--E-mail input--> */}
                <div className="relative my-2">
                    <Input
                        type="email"
                        label="Email: "
                        className=" w-full px-4 py-2 rounded-sm"
                        placeholder="Enter Your Email..."
                        required
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => { /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || "Email address must be valid" }
                            }
                        })}
                    />
                </div>

                {/* <!--Password input--> */}
                <div className="relative mb-6">
                    <Input
                        type="password"
                        label="Password: "
                        className="w-full px-4 py-2 rounded-sm"
                        placeholder="Enter your Password..."
                        required
                        {...register("password", {
                            required: true
                        })}
                    />
                </div>
                <div className="mb-6 flex items-center justify-between">
                    {/* <!--Forgot password link--> */}
                    <Link
                        to="/"
                        className="text-white hover:text-slate-900 font-medium focus:outline-none"
                    >Forgot password?</Link>
                </div>

                {/* <!--Sign in button--> */}
                <div className='flex justify-center'>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-3/5 rounded bg-green-600 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white hover:text-green-600 shadow-green-400 transition duration-150 ease-in-out hover:bg-green-200 hover:font-medium hover:shadow-green-400 focus:outline-none focus:ring-0 motion-reduce:transition-none ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </div>

                {/* <!--Register link--> */}
                <p className="mt-6 text-center">
                    Not a member? &nbsp;
                    <Link
                        to="/signup"
                        className="text-white hover:text-slate-900 font-medium focus:outline-none "
                    >Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
