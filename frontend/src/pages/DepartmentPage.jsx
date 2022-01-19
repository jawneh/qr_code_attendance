import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import DepartmentListComponent from "../Components/DepartmentListComponent"
import AddDepartmentComponent from "../Components/forms/AddDepartmentComponent"
import { Link } from "react-router-dom"
import { Breadcrumb, Container } from "react-bootstrap"

const DepartmentPage = () => {
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
          <Breadcrumb.Item active>Departments</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      {/* <DepartmentListComponent /> */}
      <AddDepartmentComponent />
    </>
  )
}

export default DepartmentPage
