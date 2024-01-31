import { useEffect, useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { io } from 'socket.io-client';
import { HOST } from './util/constants';

function App() {
  const [user,setUser] = useState(null); //contains email of user
  const [socket,setSocket] = useState(null);
  
  useEffect(()=>{
    setSocket(io(HOST)); //establish socket connection
  },[]);

  useEffect(()=>{
    if(user){
      socket?.emit("new-user",user);
    }
  },[user,socket]);

  return (
    <div className="App">
      {user ? <Home socket={socket} user={user}></Home> :<Login userFunc={setUser}></Login>}
    </div>
  );
}

export default App;
