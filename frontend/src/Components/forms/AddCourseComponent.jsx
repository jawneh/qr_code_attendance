import React, { useState, useEffect } from "react"
import FormFieldComponent from "../FormFieldComponent"
import LoaderComponent from "../LoaderComponent"
import AlertComponent from "../AlertComponent"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Form } from "react-bootstrap"
import { CodeSquare } from "react-bootstrap-icons"
import { AbsoluteCenter, CustomButton } from "../CustomStyledComponents"
import { addCourseAction } from "../../redux/course/Actions"
import { usersGetAction } from "../../redux/users/Actions"
import { fetchFacultiesAction } from "../../redux/faculties/Actions"
import { fetchDepartmentsAction } from "../../redux/departments/Actions"
import { ADD_COURSE_FAIL } from "../../redux/course/Constants"

const AddCourseComponent = () => {
  const dispatch = useDispatch()
  const [name, setCourseName] = useState("")
  const [code, setCourseCode] = useState("")
  const [unit, setCourseUnit] = useState("")
  const [lecturer_id, setLecturer] = useState("")
  const [department_id, setDepartment] = useState("")
  const [faculty_id, setFaculty] = useState("")

  const { loading, error, success } = useSelector(state => state.addCourse)
  const { users } = useSelector(state => state.usersGet)
  const new_users = users.map(unit => ({
    _id: unit._id,
    name: unit.first_name + " " + unit.last_name,
  }))
  const fetchFaculties = useSelector(state => state.fetchFaculties)
  const { faculties } = fetchFaculties

  const fetchDepartments = useSelector(state => state.fetchDepartments)
  const { departments } = fetchDepartments

  useEffect(() => {
    dispatch(usersGetAction())
    dispatch(fetchDepartmentsAction())
    dispatch(fetchFacultiesAction())
  }, [dispatch])
  const form_arr = [
    {
      key: 1,
      control_id: "course",
      label: "Title",
      icon: <CodeSquare color='green' />,
      type: "text",
      required: true,
      placeholder: "",
      size: "sm",
      value: name,
      helper_text: "",
      handleFieldValue: setCourseName,
    },
    {
      key: 2,
      control_id: "course_code",
      label: "Course Code",
      icon: <CodeSquare color='green' />,
      type: "text",
      required: true,
      placeholder: "",
      size: "sm",
      value: code,
      helper_text: "",
      handleFieldValue: setCourseCode,
    },
    {
      key: 3,
      control_id: "course_unit",
      label: "Course Unit",
      icon: <CodeSquare color='green' />,
      type: "text",
      required: true,
      placeholder: "",
      size: "sm",
      value: unit,
      helper_text: "",
      handleFieldValue: setCourseUnit,
    },
    {
      key: 4,
      control_id: "course_lecturer",
      label: "Lecturer",
      icon: <CodeSquare color='green' />,
      type: "select",
      options: new_users,
      required: true,
      placeholder: "",
      size: "sm",
      value: lecturer_id,
      helper_text: "",
      handleFieldValue: setLecturer,
    },
    {
      key: 5,
      control_id: "faculty",
      label: "Faculty",
      icon: <CodeSquare color='green' />,
      type: "select",
      options: faculties,
      required: true,
      placeholder: "",
      size: "sm",
      value: faculty_id,
      helper_text: "",
      handleFieldValue: setFaculty,
    },
    {
      key: 6,
      control_id: "department",
      label: "Department",
      icon: <CodeSquare color='green' />,
      type: "select",
      options: departments,
      required: true,
      placeholder: "",
      size: "sm",
      value: department_id,
      helper_text: "",
      handleFieldValue: setDepartment,
    },
  ]
  const addCourse = e => {
    e.preventDefault()
    if (name && unit && lecturer_id && faculty_id && department_id) {
      dispatch(addCourseAction({ name, code, faculty_id, department_id, lecturer_id, unit }))
    } else {
      dispatch({ type: ADD_COURSE_FAIL, payload: "All fields are required" })
    }
  }
  return (
    <>
      <AbsoluteCenter max-width='25vw'>
        <Row>
          <Col sm='12' md='12' lg='12'>
            <h4>Add Course</h4>
          </Col>
          <Col sm='12' md='12' lg='12'>
            {error && <AlertComponent variant='danger'>{error}</AlertComponent>}
            {success && <AlertComponent variant='success'>{success}</AlertComponent>}
            {loading && <LoaderComponent />}
            <Form onSubmit={addCourse}>
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
                    Add Course
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

export default AddCourseComponent
