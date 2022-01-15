import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AttendancePage from "./pages/AttendancePage"
import AttendancesPage from "./pages/AttendancesPage"
import CoursePage from "./pages/CoursePage"
import DashboardPage from "./pages/DashboardPage"
import FacultyPage from "./pages/FacultyPage"
import Header from "./Components/Header"
import LoginPage from "./pages/LoginPage"
import NotFoundPage from "./pages/NotFoundPage"
import QRCodePage from "./pages/QRCodePage"
import StudentPage from "./pages/StudentPage"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/attendance/:id' element={<AttendancePage />}></Route>
        <Route exact path='/attendance' element={<AttendancesPage />}></Route>
        <Route exact path='/course' element={<CoursePage />}></Route>
        <Route exact path='/faculty' element={<FacultyPage />}></Route>
        <Route exact path='/login' element={<LoginPage />}></Route>
        <Route exact path='/qrcode' element={<QRCodePage />}></Route>
        <Route exact path='/student' element={<StudentPage />}></Route>
        <Route exact path='/' element={<DashboardPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
