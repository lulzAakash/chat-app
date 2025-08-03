import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//Pages
import Home from './Pages/home/Home';
import Login from './Pages/login/Login';
import SignUp from './Pages/signup/SignUp';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {

  const { authUser } = useAuthContext();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"} />} />
          <Route path="/login" element={authUser ? <Navigate to={"/"}/> : <Login/>} />
          <Route path="/signup" element={authUser ? <Navigate to={"/login"} /> : <SignUp/>} />
        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App
