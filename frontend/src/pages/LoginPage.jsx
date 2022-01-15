import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AlertComponent from "../Components/AlertComponent"
import LoaderComponent from "../Components/LoaderComponent"
import FormFieldComponent from "../Components/FormFieldComponent"
import { useNavigate } from "react-router-dom"
import { userLoginAction } from "../redux/users/Actions"
import { USER_LOGIN_FAIL } from "../redux/users/Constants"
import { Form, Row, Col, Button } from "react-bootstrap"
import { AbsoluteCenter, CustomButton } from "../Components/CustomStyledComponents"
import { PersonFill, LockFill } from "react-bootstrap-icons"
const LoginPage = () => {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loading, error, user_info } = useSelector(state => state.qrCodeUserLogin)
  const { token } = user_info

  useEffect(() => {
    if (token) {
      navigateTo("/")
    }
  }, [token, navigateTo])

  const form_arr = [
    {
      key: 1,
      control_id: "email",
      label: "Email",
      icon: <PersonFill color='green' />,
      type: "text",
      required: true,
      placeholder: "",
      size: "sm",
      value: email,
      helper_text: "",
      handleFieldValue: setEmail,
    },
    {
      key: 2,
      control_id: "passowrd",
      label: "Password",
      icon: <LockFill color='green' />,
      type: "password",
      required: true,
      placeholder: "",
      size: "sm",
      value: password,
      helper_text: "",
      handleFieldValue: setPassword,
    },
  ]
  const userLogin = e => {
    e.preventDefault()
    if (email && password) {
      dispatch(userLoginAction(email, password))
    } else {
      dispatch({ type: USER_LOGIN_FAIL, payload: "Email and password are required" })
    }
  }

  return (
    <>
      <AbsoluteCenter max_width='25vw'>
        <Row>
          <Col sm='12' md='12' lg='12'>
            <h4>Login</h4>
          </Col>
          <Col sm='12' md='12' lg='12'>
            {error && <AlertComponent variant='danger'>{error}</AlertComponent>}
            {loading && <LoaderComponent />}
            <Form onSubmit={userLogin}>
              <Row>
                {form_arr.map(field => (
                  <Col sm='12' md='12' lg='12' key={field.key}>
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
                    Login
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

export default LoginPage
