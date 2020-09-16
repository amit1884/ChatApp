import React,{useState,useEffect} from 'react'
import './style.css'
import {useParams} from 'react-router-dom';
import Avatar from '../../Images/mainlogo.png';
import Navbar from '../Navbar';
const url='https://reactappserver.herokuapp.com';
// const url='http://localhost:5000';
function FriendProfile() {
    const {id}=useParams()
    const [UserData,setUserData]=useState({})

    useEffect(()=>{
        fetch(`${url}/friendprofile/${id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
        })
        .catch(err=>console.log(err))
    },[])
    return (
       <>
       <Navbar/>
        <div className="constainer-fluid">
            <div className="profile-img">
                <img src ={Avatar} alt ="dp"/>
            </div>
            <div className="userdetails">
                <p>Username</p>
                <p>Email</p>
            </div>
            {/* <div className="logoutbtn"
                onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push("/login")
                }}>
                <p>Logout</p>
            </div> */}
        </div>
       </>
       )
}

export default FriendProfile
