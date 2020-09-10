import React, {useContext} from 'react'
import './style.css'
import { Link ,useHistory} from 'react-router-dom';
import Logo from '../Images/mainlogo.png';
import {UserContext} from '../App'
function Navbar() {
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory();
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
                    <button 
                        style={{background:"transparent",border:"none",outline:"none"}}
                        onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push("/login")
                        }}>
                        <i className="fa fa-power-off"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
