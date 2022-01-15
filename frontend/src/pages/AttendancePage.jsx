import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Moment from "react-moment"
import AlertComponent from "../Components/AlertComponent"
import LoaderComponent from "../Components/LoaderComponent"
import TabulateComponent from "../Components/TabulateComponent"
import { Link } from "react-router-dom"
import { getAttendanceAction } from "../redux/attendance/Actions"
import { CustomQRCodeView, AbsoluteCenter } from "../Components/CustomStyledComponents"
import { Container, Row, Col, Image, Accordion, Breadcrumb } from "react-bootstrap"

const AttendancePage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const qrCodeUserLogin = useSelector(state => state.qrCodeUserLogin)
  const { user_info } = qrCodeUserLogin
  const { token } = user_info
  const { loading, error, attendance } = useSelector(state => state.fetchAttendance)
  const { attendees, course_id, end_time, start_time, latitude, longitude, qr_code, createdAt } =
    attendance
  useEffect(() => {
    if (token) {
      navigateTo("/login")
    } else {
      if (id) {
        dispatch(getAttendanceAction(id))
      } else {
        navigateTo("/attendances")
      }
    }
  }, [dispatch, navigateTo, token, id])

  const columns = [
    { name: "s/n", selector: row => row.s_n, sortable: true, width: "10%" },
    { name: "Matric Number", selector: row => row.university_id, sortable: true, width: "20%" },
    { name: "Faculty", selector: row => row.faculty, sortable: false, width: "10%" },
    { name: "Department", selector: row => row.department, sortable: true, width: "20%" },
    { name: "Email", selector: row => row.email, sortable: true, width: "20%" },
    { name: "Phone", selector: row => row.phone, sortable: true, width: "20%" },
  ]

  const table_data =
    attendees && attendees.length > 0
      ? attendees.map((x, index) => ({
          s_n: index + 1,
          university_id: <Moment format='Do MMMM YYYY'>{x.createdAt}</Moment>,
          faculty: x.course_id,
          department: x.start_time,
          email: x.end_time,
          phone: x.phone,
        }))
      : []

  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/'>Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/attendance'>Attendances</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{course_id && course_id.code} Attendance</Breadcrumb.Item>
        </Breadcrumb>

        <h1>{course_id && course_id.code} Attendance</h1>
        {error && <AlertComponent variant='danger'>{error}</AlertComponent>}
        {loading && <LoaderComponent />}
        <p>
          Date:&nbsp;
          <Moment format='Do MMMM YYYY'>{createdAt}</Moment>
        </p>
        <p>
          {start_time} - {end_time}
        </p>
        <AbsoluteCenter max_width='75vw'>
          <TabulateComponent
            title='Attendees'
            columns={columns}
            table_data={table_data}
            loading={loading}
            error={error}
          />
        </AbsoluteCenter>
        <Accordion>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Show QRCode</Accordion.Header>
            <Accordion.Body>
              <AbsoluteCenter max_width='50vw'>
                <CustomQRCodeView>
                  <Image src={qr_code} height={"100%"} width={"100%"}></Image>
                </CustomQRCodeView>
              </AbsoluteCenter>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  )
}

export default AttendancePage
