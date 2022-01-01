import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { userLoginAction } from "../redux/users/Actions"
import { USER_LOGIN_FAIL } from "../redux/users/Constants"
import { Form, Row, Col, Button } from "react-bootstrap"
import { AbsoluteCenter } from "../Components/CustomStyledComponents"

const LoginPage = () => {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const userLogin = useSelector(state => state.userLogin)
  const {
    userInfo: { token },
  } = userLogin

  useEffect(() => {
    if (token) {
      navigateTo("/")
    }
  }, [token, navigateTo])

  const handleUserLogin = e => {
    e.preventDefault()
    if (email && password) {
      dispatch(userLoginAction(email, password))
    } else {
      dispatch({ type: USER_LOGIN_FAIL, payload: "Email and password are required" })
    }
  }

  return (
    <>
      <AbsoluteCenter>
        <Row>
          <Col xm={12} sm={12} md={12} lg={12} xl='12'>
            <p>Login Page</p>
          </Col>
          <Col xm={12} sm={12} md={12} lg={12} xl='12'>
            <Form onSubmit={handleUserLogin}>
              <Row>
                <Col xm={12} sm={12} md={12} lg={12} xl='12'>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' placeholder='umar@domain.com' size='sm' />
                    <Form.Text className='text-muted'>
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col xm={12} sm={12} md={12} lg={12} xl='12'>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' size='sm' />
                  </Form.Group>
                </Col>
                <Col xm={12} sm={12} md={12} lg={12} xl='12' m-t='3'>
                  <Button type='submit' className=''>
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col xm={12} sm={12} md={12} lg={12} xl='12'>
            <p>
              Don't have an account ?{" "}
              <span>
                <Link to='/register'>Resgister</Link>
              </span>{" "}
            </p>
          </Col>
        </Row>
      </AbsoluteCenter>
    </>
  )
}

export default LoginPage
