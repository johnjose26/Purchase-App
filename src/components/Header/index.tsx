import React from 'react';
import './index.scss';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { logOut } from '../../redux/authSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userDetails } = useAppSelector((state) => state.auth);
    console.log(userDetails);

const handleLogOut = ()=> {
    dispatch(logOut())
    setTimeout( () => {
        navigate('/');
    }, 100)

   
}

 
    return (
        <div className='header-wrap'>
            <div className='logo-container'>
                <img src='./logo.png' alt='LOGO' />
            </div>
            <nav>
                <div className='menu-container'>
                    <ul>
                        <li>  <Link to="/">  Home </Link> </li>
                        {userDetails && userDetails.type === 1 && <li> <Link to="/users">  Users </Link> </li>}
                        <li>  <Link to="/products"> Products </Link>  </li>
                        <li>  <Link to="/purchases"> Purchases </Link>  </li>
                        <li> <DropdownButton className='dropDown-Icon' id="dropdown-basic-button" title={<span className="material-symbols-outlined">account_circle</span>}>
                            <div className='dropDown-box'>
                                <span className="material-symbols-outlined">account_circle</span>
                                <h6> {userDetails.username} </h6> <br />
                                <button className='btn-primary' onClick={handleLogOut}>Logout</button>
                            </div>
                        </DropdownButton>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>

    );
};

export default Header;