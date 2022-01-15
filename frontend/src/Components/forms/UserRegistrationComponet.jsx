import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userRegistrationAction } from "../../redux/users/Actions"
import { fecthFacultiesAction } from "../../redux/faculties/Actions"
import { fecthDepartmentsAction } from "../../redux/departments/Actions"
import { USER_REGISTRATION_FAIL } from "../../redux/users/Constants"
import FormFieldComponent from "../FormFieldComponent"
import LoaderComponent from "../LoaderComponent"
import AlertComponent from "../AlertComponent"
import { AbsoluteCenter, CustomButton } from "../CustomStyledComponents"
import { Row, Col, Form } from "react-bootstrap"
import {
  PersonCircle,
  PeopleFill,
  CardHeading,
  At,
  Building,
  HouseFill,
  TelephoneFill,
  LockFill,
  UnlockFill,
} from "react-bootstrap-icons"

const RegistrationPage = () => {
  const dispatch = useDispatch()

  const [department_id, setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [faculty_id, setFaculty] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [university_id, setUniversityId] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")

  const userRegistration = useSelector(state => state.userRegistration)
  const { loading, success, error } = userRegistration

  const fetchFaculties = useSelector(state => state.fetchFaculties)
  const { faculties } = fetchFaculties

  const fetchDepartments = useSelector(state => state.fetchDepartments)
  const { departments } = fetchDepartments

  useEffect(() => {
    dispatch(fecthFacultiesAction())
    dispatch(fecthDepartmentsAction())

    if (success) {
      setDepartment("")
      setEmail("")
      setFirstName("")
      setLastName("")
      setUniversityId("")
      setPassword("")
      setConfirmPassword("")
      setPhone("")
    }
  }, [dispatch, success])

  const form_arr = [
    {
      key: 1,
      control_id: "first_name",
      label: "First Name",
      icon: <PersonCircle color='green' />,
      type: "text",
      required: true,
      placeholder: "umar",
      size: "sm",
      value: first_name,
      helper_text: "Your first name",
      handleFieldValue: setFirstName,
    },
    {
      key: 2,
      control_id: "last_name",
      label: "Last name",
      icon: <PeopleFill color='green' />,
      type: "text",
      required: true,
      placeholder: "dukure",
      size: "sm",
      value: last_name,
      helper_text: "Your family name",
      handleFieldValue: setLastName,
    },
    {
      key: 3,
      control_id: "staff_id",
      label: "Univeristy Id",
      icon: <CardHeading color='green' />,
      type: "text",
      required: true,
      placeholder: "A1232NA",
      size: "sm",
      value: university_id,
      helper_text: "Your work identity",
      handleFieldValue: setUniversityId,
    },
    {
      key: 4,
      control_id: "email",
      label: "Email",
      icon: <At color='green' />,
      type: "text",
      required: true,
      placeholder: "something@provider.com",
      size: "sm",
      value: email,
      helper_text: "Your email address",
      handleFieldValue: setEmail,
    },
    {
      key: 5,
      control_id: "faculty",
      label: "Faculty",
      icon: <Building color='green' />,
      type: "select",
      required: true,
      options: faculties,
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
      icon: <HouseFill color='green' />,
      type: "select",
      required: true,
      options: departments,
      placeholder: "",
      size: "sm",
      value: department_id,
      helper_text: "",
      handleFieldValue: setDepartment,
    },
    {
      key: 7,
      control_id: "phone",
      label: "Phone",
      icon: <TelephoneFill color='green' />,
      type: "text",
      required: true,
      placeholder: "0803xxxx",
      size: "sm",
      value: phone,
      helper_text: "your personal phone number",
      handleFieldValue: setPhone,
    },
    {
      key: 8,
      control_id: "password",
      label: "Password",
      icon: <LockFill color='green' />,
      type: "password",
      required: true,
      placeholder: "xxxxxx",
      size: "sm",
      value: password,
      helper_text: "Your secret password",
      handleFieldValue: setPassword,
    },
    {
      key: 9,
      control_id: "confirm_password",
      label: "Confirm Password",
      icon: <UnlockFill color='green' />,
      type: "password",
      required: true,
      placeholder: "xxxxxx",
      size: "sm",
      value: confirm_password,
      helper_text: "Re-enter your password",
      handleFieldValue: setConfirmPassword,
    },
  ]
  const registerUser = e => {
    e.preventDefault()

    const user_data = {
      first_name,
      last_name,
      email,
      university_id,
      faculty_id,
      department_id,
      phone,
      password,
      confirm_password,
    }
    if (
      first_name &&
      last_name &&
      email &&
      university_id &&
      faculty_id &&
      department_id &&
      phone &&
      password
    ) {
      if (password === confirm_password) {
        dispatch(userRegistrationAction(user_data))
      } else {
        dispatch({ type: USER_REGISTRATION_FAIL, payload: "Passwords do not match" })
      }
    } else {
      dispatch({ type: USER_REGISTRATION_FAIL, payload: "Fill in all required fields" })
    }
  }
  return (
    <>
      <AbsoluteCenter>
        <Row>
          <Col sm='12' md='12' lg='12'>
            <h1>Register</h1>
          </Col>
          <Col sm='12' md='12' lg='12'>
            {error && <AlertComponent variant='danger'>{error}</AlertComponent>}
            {success && <AlertComponent variant='success'>{success}</AlertComponent>}
            {loading && <LoaderComponent />}
            <Form onSubmit={registerUser}>
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
                  <CustomButton className='' type='submit'>
                    Register me
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

export default RegistrationPage
