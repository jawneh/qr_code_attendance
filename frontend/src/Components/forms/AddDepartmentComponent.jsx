import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Form, Button } from "react-bootstrap"
import { Building } from "react-bootstrap-icons"
import AlertComponent from "../AlertComponent"
import LoaderComponent from "../LoaderComponent"
import FormFieldComponent from "../FormFieldComponent"
import { addDepartmentAction } from "../../redux/departments/Actions"
import { AbsoluteCenter } from "../CustomStyledComponents"

const AddDepartmentComponent = () => {
  const dispatch = useDispatch()

  const { loading, error, added_department_name } = useSelector(state => state.addDepartment)

  const [department_name, setDepartmentName] = useState("")
  const [faculty_name, setFacultyName] = useState("")

  const form_arr = [
    {
      key: 1,
      control_id: "department",
      label: "Department",
      icon: <Building color='green' />,
      type: "text",
      required: true,
      placeholder: "",
      size: "sm",
      value: department_name,
      helper_text: "",
      handleFieldValue: setDepartmentName,
    },
    {
      key: 2,
      control_id: "faculty",
      label: "Faculty",
      icon: <Building color='green' />,
      type: "select",
      required: true,
      placeholder: "",
      size: "sm",
      value: faculty_name,
      helper_text: "",
      handleFieldValue: setFacultyName,
    },
  ]
  const addFaculty = e => {
    e.preventDefault()
    if (department_name) {
      dispatch(addDepartmentAction({ name: department_name }))
    } else {
      alert("fill in the faculty")
    }
  }
  return (
    <>
      <AbsoluteCenter>
        <Row>
          <Col sm='12' md='12' lg='12'>
            <h1>Add faculty</h1>
          </Col>
          <Col sm='12' md='12' lg='12'>
            {error && <AlertComponent variant='danger'>{error}</AlertComponent>}
            {added_department_name && (
              <AlertComponent variant='success'>{added_department_name}</AlertComponent>
            )}
            {loading && <LoaderComponent />}
            <Form onSubmit={addFaculty}>
              <Row>
                {form_arr.map(field => (
                  <Col sm='12' md='6' lg='6' key={field.key}>
                    <FormFieldComponent
                      label={field.label}
                      icon={field.icon}
                      control_id={field.control_id}
                      type={field.type}
                      placeholder={field.placeholder}
                      options={field.options && field.options}
                      size={field.size}
                      value={field.value}
                      helper_text={field.helper_text}
                      handleFieldValue={field.handleFieldValue}
                    />
                  </Col>
                ))}

                <Col sm='12' md='6' lg='6'>
                  <br />
                  <Button className='' type='submit'>
                    Add Faculty
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </AbsoluteCenter>
    </>
  )
}

export default AddDepartmentComponent
