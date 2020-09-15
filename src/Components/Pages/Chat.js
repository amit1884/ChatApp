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
    const [OldMessages,setOldMessages]=useState([])
    const {friend}=useParams();
    const {id}=useParams()
    const {room}=useParams()
    useEffect(()=>{

        socket=io(ENDPOINT);
        setUser(state?state.username:'loading....')
       setFriend(friend);
       setFriendId(id);

       socket.emit('join',{id,friend,room},()=>{

       })
       fetch('http://localhost:5000/oldmessages/'+room)
       .then(res=>res.json())
       .then(result=>{

        console.log(result)
        setOldMessages(result)
       })
       .catch(err=>console.log('error',err))

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
        socket.emit('sendmessage',({text:message,sender:state.username,room:room}))
        setMessage('')
    }
    return (
        <>
        <InfoBar friend={Friend} style={{position:"fixed",top:0}}/>
        <div className="container-fluid">
            <div className="message-area">
                {
                    OldMessages.map(items=>{
                        return(
                            <>
                            <div className={items.sender===state.username?'rightbox':'leftbox'}>
                                <p >{items.text}</p>
                            </div>
                            </>
                        )
                    })
                }
                <br/>
               {messages.map(item=>{
                   return(
                       <>
                        <div className={item.sender===state.username?'rightbox':'leftbox'}>
                            <p>{item.text}</p>
                        </div>
                       </>
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
