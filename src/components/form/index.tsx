import React, { useEffect, useReducer, useState } from 'react';
import "./index.scss";
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../redux/authSlice.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getUsers} from '../../redux/userSlice.ts';


 interface State{
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirmPassword: string;
    type: number;
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
    type:2
}
 
 
const Form = ({onHide = ()=> {}, toast, toastMessage}) => {
 
    const {userDetails, jwt } = useAppSelector(state => state.auth);
    console.log(userDetails);
    const navigate = useNavigate();
    const reduxDispatch = useAppDispatch();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { username, password, firstname, lastname, confirmPassword, type } = state;
   
    const [error, setError] = useState<string>('');
    // console.log(type);


    const [show, setShow] = useState<boolean>(false);
 
 
    const SignupFn = e => {
        
        e.preventDefault();
       
        if (password === confirmPassword) {
           
            if(userDetails && userDetails.type === 1){
               
                reduxDispatch(signup({ name: `${firstname} ${lastname}`, username, password, type}))
                .then( data => {

                    if (data.payload.data.status === 200) {
                        onHide();
                        reduxDispatch(getUsers())
                        toastMessage("User Added");
                        toast();
                      
                        setTimeout(() => {
                            toast(false);

                        }, 2000);
                        
                    }

                })
               
            } else{

            reduxDispatch(signup({ name: `${firstname} ${lastname}`, username, password }))
                .then(
                    data => {
                        if (data.payload.data.status === 200) {
                            // setShowToast(true);
                            // setTimeout(() => {
                               
                            //     setShowToast(false);
                                navigate('/');
                            // }, 2000);
                        } else {
                            setError(data.payload.data.message);
                          }
                    }
                ); 
        } }
        else{
           setError("Password doesn't match");
        }
        

    };
 
   
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
                <input  type="radio" value="1" checked={type === 1} onChange={e => dispatch({ type : 1})}  /> Admin
                <input style={{marginLeft: "30px"}} type="radio" value="2"  checked={type === 2} onChange={e => dispatch({ type: 2 })}  /> User
            </label>
        }
               
                <div className='signup-footer'>
                    <Link to="/"> Login </Link>
                    <button className='btn-primary' type="submit"> Signup </button>
                </div>
            </form>
           
            
        </>
 
    );
};
 
export default Form;