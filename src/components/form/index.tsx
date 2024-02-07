import React, { useEffect, useReducer, useState } from 'react';
import "./index.scss";
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../redux/authSlice.ts';
import Toast from 'react-bootstrap/Toast';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
 
 
 interface State{
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirmPassword: string;
    radiobuttonArray: string;
 }
 
type reducerAction = Object;
 
const reducer = (state: State, action: reducerAction) => {
    return {
        ...state,
        ...action
    }
};
 
const initialState: State = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
    radiobuttonArray:'user'
}
 
 
const FormComponent = () => {
 
    const {userDetails } = useAppSelector(state => state.auth);
 
    const navigate = useNavigate();
    const reduxDispatch = useAppDispatch();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { username, password, firstname, lastname, confirmPassword, radiobuttonArray } = state;
    const [showToast, setShowToast] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
 
 
    const [show, setShow] = useState<boolean>(false);
 
 
    const SignupFn = e => {
       
        e.preventDefault();
 
 
        if (password === confirmPassword) {
 
            reduxDispatch(signup({ name: `${firstname} ${lastname}`, username, password }))
                .then(
                    data => {
                        if (data.payload.data.status === 200) {
                            setShowToast(true);
                        } else {
                            setError(data.payload.data.message);
                          }
                    }
                );
        }
        else{
           setError("Password doesn't match");
        }
 
    };
 
    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setShowToast(false);
                if(userDetails && userDetails.type === 1){
                    navigate('/users');
                } else{
                    navigate('/');
                }
               
            }, 2000);
        }
    }, [showToast, navigate, userDetails]);
 
 
    return (
 
            <>
            <form className='signup-box' onSubmit={SignupFn}>
            {userDetails && userDetails.type === 1 ? <h3> Add User </h3> : <h3>  Signup </h3> }
                <label className='form-group'>
                    <div className='form-label'> First Name </div>
                    <input className='form-control' type="text" value={firstname} onChange={e => dispatch({ firstname: e?.target?.value })} placeholder="First Name" required/>
                </label>
                <label className='form-group'>
                    <div className='form-label'> Last Name </div>
                    <input className='form-control password' type="text" value={lastname} onChange={e => dispatch({ lastname: e?.target?.value })} placeholder="Last Name" />
                </label>
                <label className='form-group'>
                    <div className='form-label'> Username </div>
                    <input className='form-control' type="email" value={username} onChange={e => dispatch({ username: e?.target?.value })} placeholder="Username" required />
                   
                </label>
                <label className='form-group'>
                    <div className='form-label'> Password </div>
                    <input className='form-control password' type="password" value={password} onChange={e => dispatch({ password: e?.target?.value })} placeholder="Password" required />
                </label>
                <label className='form-group'>
                    <div className='form-label'> Confirm Password </div>  
                    <input className= {error ? 'error-border': 'form-control password'} type="password" value={confirmPassword} onChange={e => dispatch({ confirmPassword: e?.target?.value })} placeholder="Confirm Password" required />
                    {error &&  <p style={{color:"red"}}> {error} </p> }
                </label>
               
 
            {userDetails && userDetails.type === 1 &&
             <label className='form-group'>
                <div className='form-label'> User Type </div>
                <input  type="radio" value="admin" checked={radiobuttonArray === 'admin'} onChange={e => dispatch({ radiobuttonArray : 'admin'})}  /> Admin
                <input style={{marginLeft: "30px"}} type="radio" value="user"  checked={radiobuttonArray === 'user'} onChange={e => dispatch({ radiobuttonArray: 'user' })}  /> User
            </label>
        }
               
                <div className='signup-footer'>
                    <Link to="/"> Login </Link>
                    <button className='btn-primary' type="submit"> Signup </button>
                </div>
            </form>
            <Toast className='toast-container' show={showToast} onClose={() => setShowToast(false)}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                </Toast.Header>
                <Toast.Body> User Created </Toast.Body>
            </Toast>
            {/* {error && <div className="error-message"> {error} </div>} */}
        </>
 
    );
};
 
export default FormComponent;