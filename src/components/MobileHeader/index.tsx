import React, { useState } from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { logOut } from '../../redux/authSlice.ts';


const MobileHeader = () => {
    const reduxDispatch = useAppDispatch();
    const { userDetails } = useAppSelector(state => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <div className='mobile-header-wrap' >
                <div className='mobile-logo-container'>
                    <span className="material-symbols-outlined" onClick={toggleMenu}>
                        menu
                    </span>
                    <img src='./logo.png' alt='LOGO' />
                </div>
                <nav>
                    <div className='mobile-menu-container'>
                        <div className='dashboard-container'> Dashboard </div>
                        <div> <DropdownButton className='dropDown-Icon' id="dropdown-basic-button" title={<span className="material-symbols-outlined">account_circle</span>}>
                            <div className='dropDown-box'>
                                <span className="material-symbols-outlined">account_circle</span>
                                <h6> {userDetails.username} </h6> <br /> <br />
                                <button className='btn-primary' onClick={() => reduxDispatch(logOut())}>Logout</button>
                            </div>
                        </DropdownButton> </div>
                    </div>
                </nav>
            </div>

            {isMenuOpen && (
                <>
                    <div className='mobile-overlay' onClick={toggleMenu}> </div>
                    <div className='mobile-overlay-container' >
                        <div className='logo-container'>
                            <img src='./logo1.png' alt='LOGO' />
                        </div>
                        <div className='menu-item-container'>
                            <div className='menu-item'>
                                <span className="material-symbols-outlined">
                                    home
                                </span>
                                <span> Home </span>
                            </div>
                            {userDetails && userDetails.type === 1 &&  ( <div className='menu-item'>
                                <span className="material-symbols-outlined">
                                    group
                                </span>
                                <span> Users </span>
                            </div>)}
                            <div className='menu-item'>
                                <span className="material-symbols-outlined">
                                    category
                                </span>
                                <span> Products </span>
                            </div>
                            <div className='menu-item'>
                                <span className="material-symbols-outlined">
                                    local_mall
                                </span>
                                <span> Purchases </span>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    );
};

export default MobileHeader;