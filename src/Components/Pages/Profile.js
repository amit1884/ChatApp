import React,{useState,useEffect,useContext} from 'react'
import './style.css'
import { useHistory ,useParams} from 'react-router-dom';
// import Avatar from '../../Images/mainlogo.png';
import Navbar from '../Navbar';
import {UserContext} from '../../App'
const url='https://reactappserver.herokuapp.com';
// const url='http://localhost:5000';
function Profile() {
    const history=useHistory()
    const {id}=useParams()
    const {dispatch}=useContext(UserContext)
    const [UserData,setUserData]=useState({})
    const [Image,setImage]=useState('')
    const [Url,setUrl]=useState(undefined)
    useEffect(()=>{
        fetch(`${url}/userprofile/${id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log('userprofile : ',result)
            setUserData(result)
        })
        .catch(err=>console.log(err))
    },[])

    useEffect(()=>{

        if(Url){
            fetch(`${url}/uploadpic`,{
                method:'post',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                   pic:Url
                })
            })
            .then(res=>res.json())
            .then(result=>{
                console.log('after uploading pic : ',result)
                setUserData({...UserData,pic:Url});
                dispatch({type:"UPDATEPIC",payload:{pic:Url}})
                localStorage.setItem("user",JSON.stringify(UserData))
            })
        }
    },[Url])

    const UploadPic=(e)=>{
        e.preventDefault()

        const data=new FormData()
        data.append("file",Image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name","webarts")
    
        fetch("https://api.cloudinary.com/v1_1/webarts/image/upload",{
          method:"post",
          body:data
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          setUrl(data.url)
        })
        .catch(err=>{
          console.log(err)
        })
        console.log(Image)
    }
    return (
       <>
       <Navbar/>
        <div className="constainer-fluid">
            <div className="profile-img">
                <img src ={UserData.pic} alt ="dp"/>
            </div>
            <form onSubmit={UploadPic}>
                <div class="input-group">
                <div class="input-group-prepend">
                    <button type="submit" class="input-group-text" id="inputGroupFileAddon01">Upload</button>
                </div>
                <div class="custom-file">
                    <input 
                    type="file" 
                    onChange={(e)=>setImage(e.target.files[0])}class="custom-file-input" id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"/>
                    <label class="custom-file-label" htmlfor="inputGroupFile01">Choose file</label>
                </div>
            </div>
            </form>
            <div className="userdetails">
                <p>&nbsp;<i className="fa fa-user" style={{fontSize:"20px"}}></i>&nbsp;&nbsp;{UserData.username}</p>
                <p>&nbsp;<i className="fa fa-envelope" style={{fontSize:"20px"}}></i>&nbsp;&nbsp;{UserData.email}</p>
            </div>
            <div className="logoutbtn"
                onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push("/login")
                }}>
                <p>Logout</p>
            </div>
        </div>
       </>
       )
}

export default Profile
