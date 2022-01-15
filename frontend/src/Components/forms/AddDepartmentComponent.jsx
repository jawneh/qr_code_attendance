import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Form } from "react-bootstrap"
import { Building } from "react-bootstrap-icons"
import AlertComponent from "../AlertComponent"
import LoaderComponent from "../LoaderComponent"
import FormFieldComponent from "../FormFieldComponent"
import { addDepartmentAction } from "../../redux/departments/Actions"
import { ADD_DEPARTMENT_FAIL } from "../../redux/departments/Constants"
import { fecthFacultiesAction } from "../../redux/faculties/Actions"
import { AbsoluteCenter, CustomButton } from "../CustomStyledComponents"

const AddDepartmentComponent = () => {
  const dispatch = useDispatch()

  const { loading, error, success } = useSelector(state => state.addDepartment)

  const [name, setDepartment] = useState("")
  const [faculty_id, setFaculty] = useState("")
  const fetchFaculties = useSelector(state => state.fetchFaculties)
  const { faculties } = fetchFaculties

  useEffect(() => {
    dispatch(fecthFacultiesAction())
  }, [dispatch])
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
      value: name,
      helper_text: "",
      handleFieldValue: setDepartment,
    },
    {
      key: 2,
      control_id: "faculty",
      label: "Faculty",
      icon: <Building color='green' />,
      options: faculties,
      type: "select",
      required: true,
      placeholder: "",
      size: "sm",
      value: faculty_id,
      helper_text: "",
      handleFieldValue: setFaculty,
    },
  ]
  const addDepartment = e => {
    e.preventDefault()
    if (name && faculty_id) {
      dispatch(addDepartmentAction({ name, faculty_id }))
    } else {
      dispatch({ type: ADD_DEPARTMENT_FAIL, payload: "Department and faculty are required" })
    }
  }
  return (
    <>
      <AbsoluteCenter>
        <Row>
          <Col sm='12' md='12' lg='12'>
            <h4>Add Department</h4>
          </Col>
          <Col sm='12' md='12' lg='12'>
            {error && <AlertComponent variant='danger'>{error}</AlertComponent>}
            {success && <AlertComponent variant='success'>{success}</AlertComponent>}
            {loading && <LoaderComponent />}
            <Form onSubmit={addDepartment}>
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
                <Col sm='12' md='6' lg='6'>
                  <CustomButton className='' type='submit'>
                    Add Department
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

export default AddDepartmentComponent
