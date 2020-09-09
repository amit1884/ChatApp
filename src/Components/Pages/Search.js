import React ,{useState}from 'react'
import './style.css';
import Navbar from '../Navbar';
function Search() {
    const [SearchText,setSearchText]=useState('');
    const SearchChangeHandler=(e)=>{

        setSearchText(e.target.value);
        console.log(SearchText);
    }
    return (
        <>
            <Navbar/>
            <div className="search-area">
            <input 
            type="text" 
            placeholder="Enter the email Id or username"
            onChange={SearchChangeHandler}
            value={SearchText}
            className="search-box"
            />
            </div>

        </>
    )
}

export default Search
