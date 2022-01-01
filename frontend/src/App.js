import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import NotFoundPage from "./pages/NotFoundPage"
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginPage />}></Route>
        <Route exact path='/' element={<DashboardPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
