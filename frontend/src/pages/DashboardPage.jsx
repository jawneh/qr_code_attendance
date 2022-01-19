import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import CardItemsMenu from "../Components/CardItemsMenu"
import { primaryColor, secondaryColor } from "../Components/CustomStyledComponents"
import { Container, Row, Col } from "react-bootstrap"
import {
  PersonBadge,
  PeopleFill,
  QrCodeScan,
  ListCheck,
  LifePreserver,
  PlusSlashMinus,
  HouseFill,
} from "react-bootstrap-icons"
const DashboardPage = () => {
  const navigateTo = useNavigate()
  const qrCodeUserLogin = useSelector(state => state.qrCodeUserLogin)
  const { user_info } = qrCodeUserLogin
  const { token, first_name, last_name } = user_info

  useEffect(() => {
    if (!token) {
      navigateTo("/login")
    }
  }, [navigateTo, token])
  const icon_size = 100
  const icon_color = secondaryColor
  const menu_arr = [
    {
      icon: <ListCheck color={icon_color} size={icon_size} />,
      title: "Attendance",
      navigate_to: "/attendance",
    },
    {
      icon: <QrCodeScan color={icon_color} size={icon_size} />,
      title: "QR Codes",
      navigate_to: "/qrcode",
    },
    {
      icon: <PersonBadge color={icon_color} size={icon_size} />,
      title: "Admin/Lecturers",
      navigate_to: "/users",
    },
    {
      icon: <PeopleFill color={icon_color} size={icon_size} />,
      title: "Students",
      navigate_to: "/student",
    },
    {
      icon: <LifePreserver color={icon_color} size={icon_size} />,
      title: "Courses",
      navigate_to: "/course",
    },
    {
      icon: <HouseFill color={icon_color} size={icon_size} />,
      title: "Faculties",
      navigate_to: "/faculty",
    },
    {
      icon: <PlusSlashMinus color={icon_color} size={icon_size} />,
      title: "Departments",
      navigate_to: "/department",
    },
  ]
  return (
    <>
      <Container text>
        <Row>
          <Col>
            <h1>
              Welcome {first_name} {last_name}
            </h1>
          </Col>
        </Row>
        <Row>
          {menu_arr.map((item, index) => (
            <Col sm='12' md='3' lg='3' style={{ padding: "2rem" }}>
              <Link to={item.navigate_to} style={{ textDecoration: "none", color: primaryColor }}>
                <CardItemsMenu key={index} icon={item.icon} title={item.title} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default DashboardPage
