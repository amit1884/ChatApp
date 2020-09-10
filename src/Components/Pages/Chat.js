import React ,{useState,useEffect,useContext}from 'react'
import io from 'socket.io-client';
import InfoBar from './InfoBar';
import {useParams} from 'react-router-dom'
import {UserContext} from '../../App'
import './style.css'
let socket;
const ENDPOINT='http://localhost:5000';
function Chat() {

    const {state,dispatch}=useContext(UserContext)
    const [User,setUser]=useState('')
    const [Friend,setFriend]=useState('')
    const [FriendId,setFriendId]=useState('')
    const [message,setMessage]=useState('')
    const [messages,setMessages]=useState([])
    const {friend}=useParams();
    const {id}=useParams()
    useEffect(()=>{

        socket=io(ENDPOINT);
        setUser(state?state.username:'loading....')
       setFriend(friend);
       setFriendId(id);
        socket.on('testmessage',(data)=>{
            console.log(data)
        })
       return ()=>{
           socket.emit('disconnect');
           socket.off();
       }
    },[]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message])
        });
    },[messages]);

    const sendMessage=(event)=>{
        event.preventDefault();
        socket.emit('sendmessage',({text:message}))
        setMessage('')
    }
    return (
        <>
        <InfoBar friend={Friend} style={{position:"fixed",top:0}}/>
        <div className="container-fluid">
            <div className="message-area">
               {messages.map(item=>{
                   return(
                   <p>{item.text}</p>
                   )
               })}
            </div>
        </div>


        <div className="container-fluid">
        <form className="typing-area">
                <input
                className="input"
                type="text"
                placeholder="Type a message ...."
                value={message}
                onChange={(event)=>setMessage(event.target.value)}
                onKeyPress={(event)=>event.keyy==='Enter'?sendMessage(event):null}
                />
                <button className="sendbtn" 
                onClick={(event)=>sendMessage(event)}
                >Send </button>
            </form>
        </div>
        </>
    )
}

export default Chat
