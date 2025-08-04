import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/profile/Register'
import Home from './components/home/Home'
import { UserProvider } from './context/userContext'
import { ChallengContextProvider } from './context/challengContext'
import Login from './components/profile/Login'
import Profile from './components/profile/Profile'
import Challengs from './components/challenges/Challengs'


function App() {
  return (
    <UserProvider>
      <ChallengContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            {/* ✅ Protected route */}
            <Route
              path='/profile'
              element={

                <Profile />

              }
            />
            <Route path='/challengs' element={<Challengs />} />
          </Routes>
        </Router>
      </ChallengContextProvider>
    </UserProvider>
  )
}

export default App

