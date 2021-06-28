
import React, { useState, useEffect } from 'react'

import Sitebar from './home/Navbar'
import Auth from './auth/Auth'

function App() {

  const [sessionToken, setSessionToken] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'))
    }
  
  }, [])

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('')
  }

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken)
    setSessionToken(newToken)
    console.log(newToken)
  }

  return (
   
    <div>
      <Sitebar clickLogout={clearToken} />
      <Auth  updateToken={updateToken}/>
    </div>
  );
}

export default App;
