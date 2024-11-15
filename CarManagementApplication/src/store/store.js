import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authSlice from './authSlice.js';


const persistConfig = {
    key: 'auth', // key for the persisted reducer
    storage, // storage method (localStorage by default)
};

const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
    reducer:{
        auth: persistedReducer,
    }
});

const persistor = persistStore(store);

export  {store, persistor};