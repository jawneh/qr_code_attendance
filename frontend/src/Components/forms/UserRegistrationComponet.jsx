import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Form, Button } from "react-bootstrap"
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
import { userRegistrationAction } from "../../redux/users/Actions"
import { fecthFacultiesAction } from "../../redux/faculties/Actions"
import FormFieldComponent from "../FormFieldComponent"
import { AbsoluteCenter } from "../CustomStyledComponents"

const RegistrationPage = () => {
  const dispatch = useDispatch()
  const fetchFaculties = useSelector(state => state.fetchFaculties)
  const { faculties } = fetchFaculties

  useEffect(() => {
    dispatch(fecthFacultiesAction())
  }, [dispatch])

  const [department, setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [faculty, setFaculty] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [staff_id, setStaffId] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")

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
      label: "Staff Id",
      icon: <CardHeading color='green' />,
      type: "text",
      required: true,
      placeholder: "A1232NA",
      size: "sm",
      value: staff_id,
      helper_text: "Your work identity",
      handleFieldValue: setStaffId,
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
      value: faculty,
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
      options: ["Law", "Medicine", "Account"],
      placeholder: "",
      size: "sm",
      value: department,
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
      type: "text",
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
      type: "text",
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
      staff_id,
      faculty,
      department,
      phone,
      password,
      confirm_password,
    }
    dispatch(userRegistrationAction(user_data))
  }
  return (
    <>
      <AbsoluteCenter>
        <Row>
          <Col sm='12' md='12' lg='12'>
            <h1>Register</h1>
          </Col>
          <Col sm='12' md='12' lg='12'>
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

                <Col sm='12' md='6' lg='6'>
                  <br />
                  <Button className='' type='submit'>
                    Register me
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

export default RegistrationPage
