import React from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import Logo from '../../Images/mainlogo.png';
function InfoBar({friend,id}) {
    return (
        <div className="container-fluid header">
            <div className="row top-nav">
                <div className="col">
                    <Link to ={`/friendprofile/${id}`}>
                    <img src ={Logo} alt="logo" className="logo-small"/>
                    </Link>
                </div>
                <div className="col text-center">
                    <Link to ={`/friendprofile/${id}`}>
                    <p className="brand-name" style={{color:'#000'}}>{friend}</p>
                    </Link>
                </div>
                <div className="col text-center">
                    <Link to ="/">
                        <i className="fa fa-arrow-left"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default InfoBar
