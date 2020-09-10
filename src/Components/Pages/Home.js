import React,{useState,useEffect} from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import Avatar from '../../Images/mainlogo.png';
import Navbar from '../Navbar';
import SearchBtn from '../SearchBtn';
import Friend from '../Friend';
function Home() {

    const [FriendsDetails,setFriendDetails]=useState([])
    useEffect(()=>{

        fetch("http://localhost:5000/getfriends",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result.users.friendList)
            setFriendDetails(result.users.friendList)
        })
    },[])
    return (
       <>
       <Navbar/>
       <SearchBtn/>
        {
            FriendsDetails.map(item=>{
                return(
                    <>
                    <Link to ={`/chat/${item.username}/${item._id}`} key={item._id}>
                    <p className="friend">
                        <img src ={Avatar} alt ="dp" align="left"width="50" height="50"/>
                        &nbsp;&nbsp;
                        <span className="namearea">{item.username}</span>
                    </p>
                    </Link>
                    <hr/>
                    </>
                )
            })
        }
       </>
    )
}

export default Home
