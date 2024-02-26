import React from 'react';
import "./index.scss";
import Form from "../../components/form/index.tsx";



const PageSignup = () => {
 
    return (
        <div className='signup-wrap'>
            <div className='logo-container'>
                <img src='./logo.png' alt='LOGO' />
            </div>
            <Form/>
        </div>
        
    );
};
 
export default PageSignup;