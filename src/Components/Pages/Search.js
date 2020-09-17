import React ,{useState,useContext}from 'react'
import './style.css';
import {UserContext} from '../../App'
import Navbar from '../Navbar';
import './style.css'
// import Avatar from '../../Images/mainlogo.png'
const url='https://reactappserver.herokuapp.com';
// const url='http://localhost:5000';
function Search() {
    const [SearchText,setSearchText]=useState('');
    const [userDetails,setUserDetails]=useState([])
    const [FriendId,setFriendId]=useState('') //Id of friend to be added ,it is passed to the modal
    const [Username,setUsername]=useState('')
    const [showModal,setshowModal]=useState(false)
    const {state,dispatch}=useContext(UserContext)

    const SearchChangeHandler=(query)=>{

        setSearchText(query);
        if(!query)
        {
            setUserDetails([])
        }
        else{
            fetch(`${url}/search_user`,{
                method:"post",headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    query
                })
            })
            .then(res=>res.json())
            .then(result=>{
                // console.log(result)
                setUserDetails(result.user)
            })
        }
        
    }

 //Function to open modal
 const openModal=(id,username)=>{
    setFriendId(id);
    setUsername(username);
    setshowModal(true);
}

const AddFriend=()=>{

    console.log('Friend id ::',FriendId)
    fetch(`${url}/addfriend`,{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            friendId:FriendId
        })
    })
    .then(res=>res.json())
    .then(data=>{
        // console.log('result  ',data)
        //Updating the state of reducer and localstorage 
        dispatch({type:"UPDATE",payload:{friendList:data.friendList}})
        localStorage.setItem("user",JSON.stringify(data))
    })
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
                            <>
                            {
                                item._id!==state._id
                                ?
                                <div className="single-user" onClick={()=>openModal(item._id,item.username)}>
                                <p key={item._id}>
                                    <img src ={item.pic} alt="userdp"align="left" width="40" height="40" style={{borderRadius:"50%"}}/>&nbsp;&nbsp;
                                    {item.username}
                                </p>
                            </div>
                            :
                            null
                            }
                            </>
                        )
                    })
                }
            </div>
            {
            showModal
            ?
            <div className="model-container" onClick={()=>setshowModal(false)}>
                <div className="mycard text-center">
                    <h5>Do you want to add <span style={{color:"rgb(48, 3, 78)"}}>{Username}</span> as a friend ?</h5><br/>
                    <button className="model-btn" onClick={()=>AddFriend()}>Yes</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="model-btn" onClick={()=>setshowModal(false)}>No</button>
                </div>
            </div>
            :null
        }

        </>
    )
}

export default Search
