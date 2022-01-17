import React, { useEffect } from "react"
import AttendanceListComponent from "../Components/AttendanceListComponent"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Breadcrumb, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
const AttendancePage = () => {
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
          <Breadcrumb.Item active>Attendances</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <AttendanceListComponent />
    </>
  )
}

export default AttendancePage
