import React,{useState,useContext} from 'react'
import './style.css';
import {Link,useHistory} from 'react-router-dom'
import Brand from '../../Images/mainlogo.png'
import {UserContext} from '../../App'
function Login() {

    const[Email,setEmail]=useState('');
    const[Password,setPassword]=useState('')
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory();
    const LoginHandler=(e)=>{
        e.preventDefault();
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:Email,
                password:Password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            if(data.error){
                console.log(data.error)
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                console.log("Logged In Successfully")
                history.push('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
      <React.Fragment>
      <div className="container-fluid ">
          <div className="row top-area">
              <div className="col-sm-12 text-center">
                <img src ={Brand} alt="brand" className="brand-img"/>
                <p className="brand-name">ChatInReact</p>
              </div>
          </div>
      </div>
      
      <div className="container-fluid">
          <div className="row">
              <div className="col-sm-12">
                <form className="login-form" onSubmit={LoginHandler}>
                    <div>
                        <input 
                        type="text" 
                        placeholder="Email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={Email}
                        className="input-tag"
                        />
                    </div>
                    <div>
                        <input 
                        type="password" 
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={Password}
                        className="input-tag"
                        />
                    </div>
                    <div>
                        <button
                        className="login-btn"
                        >
                            Login
                        </button>
                    </div>
                    <div>
                        <p>
                            <b>Forgot Password ?</b>
                        </p>
                    </div>
                </form>
                <div className="or-div">
                    <button className="or-btn">Or</button>
                </div>
                <div>
                   <Link to ="/signup">
                   <button
                    className="login-btn"
                    >
                        Create Account
                    </button>
                   </Link>
                </div>
                {/* <div>
                    <button
                    className="login-btn"
                    >
                        Login With Facebook
                    </button>
                </div> */}
              </div>
          </div>
      </div>
      </React.Fragment>
    )
}

export default Login
