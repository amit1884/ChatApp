import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import Avatar from "../../Images/mainlogo.png";
import Navbar from "../Navbar";
import Loader from "../Loader";
const url = "https://chat-app-server-ni9o.onrender.com/";
// const url='http://localhost:5000';
function FriendProfile() {
  const { id } = useParams();
  const [UserData, setUserData] = useState({});
  const [ShowLoader, setShowLoader] = useState(true);

  useEffect(() => {
    fetch(`${url}/friendprofile/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUserData(result);
        setShowLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {ShowLoader ? <Loader /> : null}
      <Navbar />
      <div className="constainer-fluid">
        <div className="profile-img">
          <img src={UserData.pic ? UserData.pic : Avatar} alt="dp" />
        </div>
        <div className="userdetails">
          <p>
            &nbsp;<i className="fa fa-user" style={{ fontSize: "20px" }}></i>
            &nbsp;&nbsp;{UserData.username}
          </p>
          <p>
            &nbsp;
            <i className="fa fa-envelope" style={{ fontSize: "20px" }}></i>
            &nbsp;&nbsp;{UserData.email}
          </p>
        </div>
      </div>
    </>
  );
}

export default FriendProfile;
