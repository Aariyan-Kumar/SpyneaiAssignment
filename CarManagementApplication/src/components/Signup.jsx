import React, { useState } from 'react';
import authService from '../appwrite/authService';
import { Link, useNavigate } from 'react-router-dom';
import { login, login as storeAuthLogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { Input } from './index'
import { useForm } from 'react-hook-form'

function Signup() {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const signup = async (data) => {
        setError("");
        setLoading(true);
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const singupUserData = await authService.getCurrentUser();
                if (singupUserData) {
                    dispatch(login(singupUserData));
                    navigate('/')
                    // console.log(singupUserData)
                }
            }
            console.log(userData);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return (
        <>
            <div
                className="w-4/12 rounded-r-lg bg-gradient-to-r from-indigo-500 to-cyan-500 p-6 shadow-4 pt-14 ">
                <h2 className='text-2xl mb-4 text-center'>Sign up</h2>
                {error && <p className='text-red-600 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(signup)}>
                    <div className="">
                        {/* <!--First name input--> */}
                        <div className="relative mb-6">
                            <Input
                                type="text"
                                className="w-full px-4 py-2 rounded-sm outline-none focus:outline-blue-800 focus:ring-2 focus:ring-blue-800"
                                id="exampleInput123"
                                aria-describedby="emailHelp123"
                                placeholder="Full Name"
                                label="Full Name"
                                required
                                {...register("name", {
                                    required: true
                                })}
                            />
                        </div>
                    </div>

                    {/* <!--Email input--> */}
                    <div className="relative mb-6" data-twe-input-wrapper-init>
                        <Input
                            type="email"
                            className="w-full px-4 py-2 rounded-sm outline-none focus:outline-blue-800 focus:ring-2 focus:ring-blue-800"
                            placeholder="Email address..."
                            label="Email address"
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
                    <div className="relative mb-6" data-twe-input-wrapper-init>
                        <Input
                            type="password"
                            className="w-full px-4 py-2 rounded-sm outline-none focus:outline-blue-800 focus:ring-2 focus:ring-blue-800"
                            placeholder="Password"
                            label="Password"
                            required
                            {...register("password", {
                                required: true
                            })}
                        />
                    </div>

                    {/* <!--Submit button--> */}
                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className={`w-3/5 rounded bg-green-600 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white hover:text-green-600 shadow-green-400 transition duration-150 ease-in-out hover:bg-green-200 hover:font-medium hover:shadow-green-400 focus:outline-none focus:ring-0 motion-reduce:transition-none ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Creating Account' : 'Create Account'}
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Signup
