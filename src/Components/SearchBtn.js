import React from 'react'
import {Link} from 'react-router-dom';
import './style.css'
function SearchBtn() {
    return (
        <Link to ="/search">
       <button className="floating-btn text-center">
           <i className="fa fa-plus"></i>
       </button>
       </Link>
    )
}

export default SearchBtn
