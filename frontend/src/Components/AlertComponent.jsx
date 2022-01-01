import React from "react"
import { Alert } from "react-bootstrap"

const AlertComponent = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

AlertComponent.defaultProps = {
  variant: "info",
}
export default AlertComponent
