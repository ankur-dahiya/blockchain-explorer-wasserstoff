import React, { useState } from 'react'
import "./login.css";

export default function Login({userFunc}) {
    const [email,setEmail] = useState(null);
  return (
    <div className='login_container'>
        <h2>Please login using your email</h2>
        <input type='text' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
        <button onClick={()=>userFunc(email)}>Submit</button>
    </div>
  )
}
