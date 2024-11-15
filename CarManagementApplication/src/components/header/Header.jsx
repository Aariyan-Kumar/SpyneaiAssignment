import React from 'react'
import { Contanier, Logo, LogoutBtn } from '../index.js'
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {

    let authStatus = useSelector((state) => (state.auth.status))
    // console.log(authStatus);
    const navigate = useNavigate();

    // console.log(authStatus);

        const navItems = [
            {
                name: "Home",
                url: '/',
                active: true
            },

            {
                name: "Login",
                url: '/login',
                active: !authStatus
            },
            {
                name: "Sign Up",
                url: '/signup',
                active: !authStatus
            },
            {
                name: "All Cars",
                url: '/all-cars',
                active: authStatus
            },
            {
                name: "Add Cars",
                url: '/add-cars',
                active: authStatus
            },
            {
                name: "Search",
                url: '/search',
                active: authStatus
            },
            {
                name: "Documentation",
                url: '/api/docs',
                active: true
            },
        ]

    return (
        <>
            <header className='py-3 bg-slate-900 '>
                <Contanier>
                    <nav className='flex'>
                        <div className=''>
                            <div className='w-20'>
                                <Link to="/">
                                    <img className='w-full rounded-full' src={Logo} alt="Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className='w-full justify-center flex items-center'>
                            <h1 className='text-center text-5xl text-white font-medium tracking-widest'>Cars Management App</h1>
                        </div>

                        <ul className='flex w-11/12 ml-auto gap-6 items-center justify-center'>
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>

                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-500" : "text-white"} hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>

                                
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </nav>
                </Contanier>

            </header>
        </>
    )
}

export default Header
