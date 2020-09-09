import React from 'react'
import './style.css'
// import { Link } from 'react-router-dom';
// import Logo from '../../Images/mainlogo.png';
import Navbar from '../Navbar';
import SearchBtn from '../SearchBtn';
import Friend from '../Friend';
function Home() {
    return (
       <>
       <Navbar/>
       <SearchBtn/>
       <Friend UserName="Aditya"/>
       <Friend UserName="Ankit"/>
       <Friend UserName="Mohit"/>
       </>
    )
}

export default Home
