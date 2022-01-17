import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import LoaderComponent from "../Components/LoaderComponent"
import AlertComponent from "../Components/AlertComponent"
import FormFieldComponent from "../Components/FormFieldComponent"
import { Link } from "react-router-dom"
import { generateQRCodeAction } from "../redux/qrcodes/Actions"
import { QRCODE_GENERATE_FAIL, QRCODE_GENERATE_RESET } from "../redux/qrcodes/Constants"
import { fetchCoursesAction } from "../redux/course/Actions"
import {
  AbsoluteCenter,
  CustomButton,
  CustomQRCodeView,
  primaryColor,
  secondaryColor,
} from "../Components/CustomStyledComponents"
import { Row, Col, Form, Image, Breadcrumb, Container } from "react-bootstrap"
import { QrCode, CodeSquare } from "react-bootstrap-icons"
const QRCodePage = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const [course_id, setCourseId] = useState("")
  const [end_time, setEndTime] = useState("")
  const [start_time, setStartTime] = useState("")

  const qrCodeUserLogin = useSelector(state => state.qrCodeUserLogin)
  const { user_info } = qrCodeUserLogin
  const { token, user_id } = user_info

  const qrCodeGenerate = useSelector(state => state.qrCodeGenerate)
  const { loading, qrcode, error } = qrCodeGenerate

  const fetchCourses = useSelector(state => state.fetchCourses)
  const { courses } = fetchCourses

  useEffect(() => {
    if (!token) {
      navigateTo("/login")
    } else {
      dispatch({ type: QRCODE_GENERATE_RESET })
      dispatch(fetchCoursesAction())
    }
  }, [dispatch, token, navigateTo])

  const form_arr = [
    {
      key: 1,
      control_id: "course",
      label: "Course",
      icon: <CodeSquare color={primaryColor} />,
      type: "select",
      required: true,
      placeholder: "",
      options: courses,
      size: "sm",
      value: course_id,
      helper_text: "",
      handleFieldValue: setCourseId,
    },
    {
      key: 2,
      control_id: "start_id",
      label: "Start time",
      icon: <CodeSquare color={primaryColor} />,
      type: "time",
      required: true,
      placeholder: "",
      size: "sm",
      value: start_time,
      helper_text: "",
      handleFieldValue: setStartTime,
    },
    {
      key: 3,
      control_id: "end_time",
      label: "End time",
      icon: <CodeSquare color={primaryColor} />,
      type: "time",
      required: true,
      placeholder: "",
      size: "sm",
      value: end_time,
      helper_text: "",
      handleFieldValue: setEndTime,
    },
  ]
  const handleGenerateQRCode = e => {
    e.preventDefault()
    if (!navigator.geolocation) {
      dispatch({
        type: QRCODE_GENERATE_FAIL,
        payload: "Geoloaction is not supported by your browser",
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          if (course_id && start_time && end_time && user_id) {
            const qr_code_data = {
              course_id,
              end_time,
              start_time,
              user_id,
              longitude: position.coords.latitude,
              latitude: position.coords.longitude,
            }
            dispatch(generateQRCodeAction(qr_code_data))
          } else {
            dispatch({
              type: QRCODE_GENERATE_FAIL,
              payload: "Course,start time and end time are all required",
            })
          }
        },
        () => {
          dispatch({
            type: QRCODE_GENERATE_FAIL,
            payload: "Unable to get your location",
          })
        }
      )
    }
  }
  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/'>Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>QRCode</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <AbsoluteCenter>
        <Row>
          <Col xm='12' sm='12' md='12' lg='12'>
            {error && <AlertComponent variant='danger'>{error}</AlertComponent>}
            {loading && <LoaderComponent />}
          </Col>
          <Col xm='12' sm='12' md='12' lg='12'>
            <Form onSubmit={handleGenerateQRCode}>
              <Row>
                {form_arr.map((field, index) => (
                  <Col sm='12' md='6' lg='6' key={index}>
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
                <Col xm='12' sm='12' md='12' lg='12' xl='12'>
                  <CustomButton type='submit' color={secondaryColor}>
                    Generate Attendance&nbsp;
                    <QrCode />
                  </CustomButton>
                </Col>
              </Row>
            </Form>
            <p>
              <Form.Text className='text-muted'>
                Note that QRCODES will contain time it was generated and geolocation params
              </Form.Text>
            </p>{" "}
          </Col>
          <Col xm='12' sm='12' md='12' lg='12'>
            <CustomQRCodeView>
              <Image src={qrcode} height={"100%"} width={"100%"}></Image>
            </CustomQRCodeView>
          </Col>
        </Row>
      </AbsoluteCenter>
    </>
  )
}

export default QRCodePage
