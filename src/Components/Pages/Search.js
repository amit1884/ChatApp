import React ,{useState,useContext}from 'react'
import './style.css';
import {UserContext} from '../../App'
import Navbar from '../Navbar';
import './style.css'
import Avatar from '../../Images/mainlogo.png'
function Search() {
    const [SearchText,setSearchText]=useState('');
    const [userDetails,setUserDetails]=useState([])
    const {state,dispatch}=useContext(UserContext)

    const SearchChangeHandler=(query)=>{

        setSearchText(query);
        if(!query)
        {
            setUserDetails([])
        }
        else{
            fetch("http://localhost:5000/search_user",{
                method:"post",headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    query
                })
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
                setUserDetails(result.user)
            })
        }
        
    }



    return (
        <>
            <Navbar/>
            <div className="search-area">
            <input 
            type="text" 
            placeholder="Enter the email Id or username"
            onChange={(e)=>SearchChangeHandler(e.target.value)}
            value={SearchText}
            className="search-box"
            />
            </div>
            <div className="userdetail-container">
                {
                    userDetails.map(item=>{
                        return(
                            <div className="single-user">
                                <p key={item._id}>
                                    <img src ={Avatar} alt="userdp"align="left" width="40" height="40"/>&nbsp;&nbsp;
                                    {item.username}
                                </p>
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Search
