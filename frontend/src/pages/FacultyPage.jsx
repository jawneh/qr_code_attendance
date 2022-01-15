import React from "react"
import FacultyListComponent from "../Components/FacultyListComponent"
import AddFacultyComponent from "../Components/forms/AddFacultyComponent"
import { Link } from "react-router-dom"
import { Breadcrumb, Container } from "react-bootstrap"
const FacultyPage = () => {
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
