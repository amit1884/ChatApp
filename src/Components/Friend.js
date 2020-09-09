import React from 'react'
import './style.css';
import {Link} from 'react-router-dom'
import Avatar from '../Images/mainlogo.png'
function Friend({UserName}) {
    return (
        <div className="conatiner-fluid" style={{overflow:"hidden"}}>
            <div className="row single-friend">
                <div className="col-3">
                    <img src ={Avatar} alt="userDp" width="70" height="70"/>
                </div>
                <div className="col-9">
                    <div className="friendname">
                        <Link to ={`/chat/${UserName}`}>
                        <p>{UserName}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friend
