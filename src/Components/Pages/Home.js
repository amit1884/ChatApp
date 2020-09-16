import React,{useState,useEffect} from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import Avatar from '../../Images/mainlogo.png';
import Navbar from '../Navbar';
import SearchBtn from '../SearchBtn';
import img from '../../Images/homeempty.svg';
const url='https://reactappserver.herokuapp.com';
// const url='http://localhost:5000'
function Home() {

    const [FriendsDetails,setFriendDetails]=useState([]) //Storing all the friends in an array
 
    useEffect(()=>{

        // console.log('getting friend list')
        fetch(`${url}/getfriends`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            // console.log('result  ',result.friendList)
            setFriendDetails(result.friendList)
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
                    <Link 
                    style={{textDecoration:"none",cursor:"pointer"}}
                    to ={`/chat/${item.users.username}/${item.users._id}/${item.room}`} 
                    key={item.users._id}>
                    <p className="friend">
                        <img src ={Avatar} alt ="dp" align="left"width="50" height="50"/>
                        &nbsp;&nbsp;
                        <span className="namearea">{item.users.username}</span>
                    </p>
                    </Link>
                    <hr/>
                    </>
                )
            })
        }
        {
            FriendsDetails.length<=0?
            <>
            <div
            style={{display:"flex",justifyContent:"center",alignItems:"center"}}
            >
                <img src ={img} alt="ksbc" width="300" style={{marginTop:"170px"}}/>
               
            </div>
            <br/>
            <div className="text-center">
                <h6>Add Friends and start Chatting !</h6>
            </div>
            </>
            :null
        }
       </>
    )
}

export default Home
