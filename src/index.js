import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context as ResponsiveContext } from 'react-responsive'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <ResponsiveContext.Provider value={{ width: 500 }}>
        <App />
    </ResponsiveContext.Provider>
 
);


