import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FacultyListComponent from "../Components/FacultyListComponent"
import AddFacultyComponent from "../Components/forms/AddFacultyComponent"
import { Link } from "react-router-dom"
import { Breadcrumb, Container } from "react-bootstrap"
const FacultyPage = () => {
  const navigateTo = useNavigate()
  const qrCodeUserLogin = useSelector(state => state.qrCodeUserLogin)
  const { user_info } = qrCodeUserLogin
  const { token } = user_info

  useEffect(() => {
    if (!token) {
      navigateTo("/login")
    }
  }, [navigateTo, token])

  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/'>Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Faculties</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <FacultyListComponent />
      <AddFacultyComponent />
    </>
  )
}

export default FacultyPage
