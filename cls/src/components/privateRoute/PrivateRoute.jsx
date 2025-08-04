import React from 'react'

function PrivateRoute({children}) {
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to="/login" />
    }
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute