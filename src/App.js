import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom';
import {reducer,initialState} from "./Reducers/userReducer"
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';
import SignUp from './Components/Pages/SignUp';
import Search from './Components/Pages/Search';
import Chat from './Components/Pages/Chat'
export const UserContext=createContext()
const Routing=()=>{
  const history=useHistory()
  const {dispatch}=useContext(UserContext)
  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem("user"))

    console.log(user)
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push("/login")
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
       <Home/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/signup">
        <SignUp/>
      </Route>
      <Route  path="/search">
        <Search/>
      </Route>
      <Route path ="/chat/:friend/:id/:room">
        <Chat/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
      <UserContext.Provider value ={{state,dispatch}}>
        <BrowserRouter>
          <Routing/>
        </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
