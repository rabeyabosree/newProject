
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/profile/Register';
import Home from './components/home/Home';
import { UserProvider } from './context/userContext';
import Login from './components/profile/Login';
import Profile from './components/profile/Profile';

function App() {


  return (
    <UserProvider>

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
