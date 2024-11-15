import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from './pages/Home.jsx';
import { AuthLayout } from './components/index.js'
import Signup from './pages/Signup.jsx';
import AllCars from './pages/AllCars.jsx';
import AddCars from './pages/AddCars.jsx';
import EditCars from './pages/EditCars.jsx';
import Post from './pages/Post.jsx';
import Login from './pages/Login.jsx';
import Docs from './pages/Docs.jsx';
import Search from './pages/Search.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      } />

      <Route path='/signup' element={
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      } />

      <Route path='/all-cars' element={
        <AuthLayout authentication>
          <AllCars />
        </AuthLayout>
      } />

      <Route path='/add-cars' element={
        <AuthLayout authentication>
          <AddCars />
        </AuthLayout>
      } />

      <Route path='/edit-post/:slug' element={
        <AuthLayout authentication>
          {" "}
          <EditCars />
        </AuthLayout>
      } />

      <Route path='/post/:slug' element={
        <AuthLayout authentication>
          <Post />
        </AuthLayout>
      } />
      <Route path='/search' element={
        <AuthLayout authentication>
          <Search />
        </AuthLayout>
      } />

      <Route path='/api/docs' element={<Docs />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <React.StrictMode>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </React.StrictMode>
  </Provider>

)
