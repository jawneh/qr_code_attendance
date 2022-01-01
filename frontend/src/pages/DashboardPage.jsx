import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserRegistrationComponent from "../Components/forms/UserRegistrationComponet"
import AddFacultyComponent from "../Components/forms/AddFacultyComponent"
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
          <Col sm='12' md='12' lg='12'>
            <h1>Headers</h1>
          </Col>
          <Col sm='12' md='12' lg='12'>
            <UserRegistrationComponent />
            <AddFacultyComponent />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DashboardPage
