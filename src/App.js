import SignUp from './Conponent/SignUp.js'
import SignIn from './Conponent/SignIn.js'
import Main from './Conponent/Main.js'
import Profile from './Conponent/Profile.js'
import CreatePost from './Conponent/CreatePost.js'


import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
// import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              {/* 기본 경로를 /SignIn으로 리디렉션 */}
              <Route path="/" element={<Navigate to="/SignIn" replace />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Main" element={<Main />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path='/CreatePost' element={<CreatePost />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;