import React from "react"
import { Row, Col } from "react-bootstrap"
import { CustomCard } from "./CustomStyledComponents"

const CardItemsMenu = ({ icon, title }) => {
  return (
    <>
      <CustomCard>
        <Row>
          <Col xm='12' sm='12' md='12' lg='12' xl='12'>
            <h1 style={{ textAlign: "center" }}>{icon}</h1>
            <p style={{ textAlign: "center" }}> {title}</p>
          </Col>
          <Col xm='12' sm='12' md='12' lg='12' xl='12'></Col>
        </Row>
      </CustomCard>
    </>
  )
}

export default CardItemsMenu
