import React, { useState } from 'react'
import Notification from './Notification';
import SearchResults from './SearchResults';
import "./home.css";
import { HOST } from '../util/constants';

export default function Home({socket,user}) {

  const [search,setSearch] = useState("");
  const [alert,setAlert] = useState([]);
  const [results,setResults] = useState();

  // save alerts received via socket connection
  socket.on("alert",({msg,type})=>{
    setAlert([...alert,{msg,type}]);
  })

  // search request
  const handleSearch = async (e)=>{
    const response = await fetch(HOST+"/search/"+search,{
      method:"post",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({email:user})
    });
    if(response.ok){
      const txns = await response.json();
      setResults(txns);
    }
  }

  return (
    <div className='home_container'>
      <div className='home_search'>
      <input type='text' onChange={(e)=>{setResults([]);setSearch(e.target.value)}} className='search_input' placeholder='Enter ETH address'></input>
      <button onClick={handleSearch}>Search</button>
      </div>
      {results?.data?.length ? <SearchResults results={results} user={user} searchInput={search}/> : ""}
      <div className="noti_toastBox">
        {alert.map((obj,ind)=>(
          <Notification key={ind} alert={obj} setAlert={setAlert}/>
        ))}
      </div>
    </div>
  )
}
