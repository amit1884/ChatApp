import React from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import Logo from '../Images/mainlogo.png';
function Navbar() {
    return (
        <div className="container-fluid header">
            <div className="row top-nav">
                <div className="col">
                    <Link to ="/">
                    <img src ={Logo} alt="logo" className="logo-small"/>
                    </Link>
                </div>
                <div className="col text-center">
                    <p className="brand-name">ChatInReact</p>
                </div>
                <div className="col text-center">
                    <Link to ="/notification">
                        <i className="fa fa-bell"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
