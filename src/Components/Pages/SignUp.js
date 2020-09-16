import React,{useState} from 'react'
import './style.css';
import {Link,useHistory} from 'react-router-dom'
import Brand from '../../Images/mainlogo.png'
const url='https://reactappserver.herokuapp.com';
// const url='http://localhost:5000';
function SignUp() {

    const[UserName,setUserName]=useState('');
    const[Email,setEmail]=useState('')
    const[Password,setPassword]=useState('')
    const[ConfirmPassword,setConfirmPassword]=useState('')
    const history=useHistory()
    const SignUpHandler=(e)=>{
        e.preventDefault();
        fetch(`${url}/signup`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:UserName,
                password:Password,
                email:Email,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
               console.log(data.error)
            }
            else{
               console.log(data.message)
                history.push('/login')
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
                <form className="login-form" onSubmit={SignUpHandler}>
                    <div>
                        <input 
                        type="text" 
                        placeholder="Username"
                        onChange={(e)=>setUserName(e.target.value)}
                        value={UserName}
                        className="input-tag"

                        />
                    </div>
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
                        <input 
                        type="password" 
                        placeholder="Confirm Password"
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        value={ConfirmPassword}
                        className="input-tag"
                        />
                    </div>
                    <div>
                        <button
                        className="login-btn"
                        >
                            SignUp
                        </button>
                    </div>
                </form>
                <br/>
                <div className="text-center">
                    <Link to ="/login">
                    <p><b>Already Have ann Account !</b></p>
                    </Link>
                </div>
              </div>
          </div>
      </div>
      </React.Fragment>
    )
}

export default SignUp
