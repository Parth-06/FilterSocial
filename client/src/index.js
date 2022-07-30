import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Spinner from './Components/Spinner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<div style={{width:"100%" ,height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}><Spinner/></div>}>
    <App />
    </Suspense>
);

reportWebVitals();
