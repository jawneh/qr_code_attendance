import React from "react"
import DepartmentListComponent from "../Components/DepartmentListComponent"
import AddDepartmentComponent from "../Components/forms/AddDepartmentComponent"
import { Link } from "react-router-dom"
import { Breadcrumb, Container } from "react-bootstrap"

const DepartmentPage = () => {
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
