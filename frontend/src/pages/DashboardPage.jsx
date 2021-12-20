import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
const DashboardPage = () => {
  const navigateTo = useNavigate()
  useEffect(() => {
    if ("no login token" == true) {
      navigateTo("/login")
    }
  }, [navigateTo])
  return (
    <>
      <Container text>
        <h2>Dashboard screen </h2>
        <Row>
          <Col>
            <h1>Attendance</h1>
          </Col>
          <Col>
            <h1>QR Code</h1>
          </Col>
          <Col>
            <h1>Lecturers</h1>
          </Col>
          <Col>
            <h1>Students</h1>
          </Col>
          <Col>
            <h1>Admins</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DashboardPage
