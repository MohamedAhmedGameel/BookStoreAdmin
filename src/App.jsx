import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Nav from './components/Nav'
import LoginPage from './pages/Login'
import RegistrationForm from './pages/Registration'

function App() {

  return (
    <div className=''>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/*" element={<Home />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<RegistrationForm />}></Route>
          {/* <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signin" element={<RegistrationForm />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
