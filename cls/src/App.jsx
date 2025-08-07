import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/profile/Register'
import Home from './components/home/Home'
import { UserProvider } from './context/userContext'
import { ChallengContextProvider } from './context/challengContext'
import Login from './components/profile/Login'
import Profile from './components/profile/Profile'
import Challengs from './components/challenges/Challengs'
import SkillPage from './components/skill/SkillPage'
import AboutPage from './components/about/AboutPage'
import Contact from './components/contact/Contact'
import ChallengePage from './components/challenges/ChallengePage';


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
             <Route path='/challengs/:id' element={<ChallengePage />} />
            <Route path='/skill' element={<SkillPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<Contact />} />

          </Routes>
        </Router>
      </ChallengContextProvider>
    </UserProvider>
  )
}

export default App

