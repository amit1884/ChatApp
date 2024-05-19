import React, { useState, useContext } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import Brand from "../../Images/mainlogo.png";
import { UserContext } from "../../App";
const url = "https://chat-app-server-ni9o.onrender.com/";
// const url='http://localhost:5000';
function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const LoginHandler = (e) => {
    e.preventDefault();
    if (Email === "" || Password === "") {
      setErrorMsg("All Fields are required !!");
      setError(true);
    } else {
      fetch(`${url}/signin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          if (data.error) {
            console.log(data.error);
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: data.user });
            console.log("Logged In Successfully");
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  setTimeout(() => {
    if (Error) {
      setError(false);
    }
  }, 2000);

  return (
    <React.Fragment>
      {Error ? (
        <div className="errorwrapper">
          <p>
            <i
              className="fa fa-question-circle"
              style={{ fontSize: "50px" }}
            ></i>
            &nbsp;&nbsp;{ErrorMsg}
          </p>
        </div>
      ) : null}
      <div className="container-fluid ">
        <div className="row top-area">
          <div className="col-sm-12 text-center">
            <img src={Brand} alt="brand" className="brand-img" />
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
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                  className="input-tag"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={Password}
                  className="input-tag"
                />
              </div>
              <div>
                <button className="login-btn">Login</button>
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
              <Link to="/signup">
                <button className="login-btn">Create Account</button>
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
  );
}

export default Login;
