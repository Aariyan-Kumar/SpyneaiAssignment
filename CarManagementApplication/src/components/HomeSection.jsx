import React, { useEffect } from 'react'
import bgImage from '../assets/bg-img-home-section.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';



function HomeSection() {

    const [user, setUser] = React.useState({});
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            setUser(userData);
            console.log(userData.name)
        }
    }, [userData])

    // console.log(user);


    return (
        <>
            <section className='w-full h-screen '>
                <div className=' h-screen bg-cover bg-center' style={{ backgroundImage: `linear-gradient(115deg, rgba(0, 10, 10, 0.658), rgba(10, 82, 127, 0.616)),url(${bgImage})` }}>
                    <div className='w-full text-center text-white font-medium tracking-wider leading-normal'>
                        <div className='pt-56'>
                            {user && (<h1 className='text-8xl text-center'>{user.name}</h1>)}
                        </div>
                        <div>
                            <p className='text-xl text-center py-2'>THE CAR & FLEETS PLATFORM</p>
                            <h2 className='text-4xl text-center'>Vehicle Management - paperless & user-friendly.</h2>
                            <br />
                            <Link to={user ? `/add-cars` : `/login`}>
                                <button className="rounded bg-blue-600 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white hover:text-blue-600 shadow-blue-400 transition duration-150 ease-in-out hover:bg-blue-200 hover:font-nedium hover:shadow-blue-400 focus:outline-none focus:ring-0 motion-reduce:transition-none ">
                                    Let's get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeSection
