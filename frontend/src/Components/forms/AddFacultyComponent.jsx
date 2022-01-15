import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Form } from "react-bootstrap"
import { Building } from "react-bootstrap-icons"
import { addFacultyAction } from "../../redux/faculties/Actions"
import FormFieldComponent from "../FormFieldComponent"
import { AbsoluteCenter, CustomButton } from "../CustomStyledComponents"
import LoaderComponent from "../LoaderComponent"
import AlertComponent from "../AlertComponent"

const FacultyRegistrationComponent = () => {
  const dispatch = useDispatch()

  const { loading, error, added_faculty_name } = useSelector(state => state.addFaculty)

  const [faculty_name, setFacultyName] = useState("")

  const form_arr = [
    {
      key: 1,
      control_id: "faculty",
      label: "Faculty",
      icon: <Building color='green' />,
      type: "text",
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
    if (faculty_name) {
      dispatch(addFacultyAction({ name: faculty_name }))
    } else {
      alert("fill in the faculty")
    }
  }
  return (
    <>
      <AbsoluteCenter>
        <Row>
          <Col sm='12' md='12' lg='12'>
            <h4>Add Faculty</h4>
          </Col>
          <Col sm='12' md='12' lg='12'>
            {error && <AlertComponent variant='danger'>{error}</AlertComponent>}
            {added_faculty_name && (
              <AlertComponent variant='success'>{added_faculty_name}</AlertComponent>
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
              </Row>
              <Row>
                <Col sm='12' md='12' lg='12'>
                  <br />
                  <CustomButton className='' type='submit'>
                    Add Faculty
                  </CustomButton>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </AbsoluteCenter>
    </>
  )
}

export default FacultyRegistrationComponent
