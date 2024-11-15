import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/authService';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index';
import { Outlet, useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';



function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);


  useEffect(() => {
    console.log(userData);
    if (userData) {
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login(userData));
          }
          else {
            dispatch(logout())
          }
        }).finally(() => {
          setLoading(false);
        })
    }
    else {
      setLoading(false);
    }
  }, [])


  if (!loading) {
    return (
      <>
        <div className='m-0 p-0 w-full '>
          <div className=''>
            <Header />
            <main className='bg-gray-200'>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className='bg-slate-900 w-full min-h-screen flex justify-center items-center gap-10'>
          <Circles
            height="80"
            width="80"
            color="#f97316"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <h1 className='text-white text-4xl'>Loading...</h1>
        </div>


      </>
    )
  };
}

export default App