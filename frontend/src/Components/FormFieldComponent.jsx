import React from "react"
import { Form } from "react-bootstrap"

const FormFieldComponent = ({
  control_id,
  label,
  icon,
  type,
  options,
  placeholder,
  size,
  value,
  helper_text,
  handleFieldValue,
}) => {
  if (type === "text" || type === "password" || type === "time") {
    return (
      <Form.Group className='mb-3' controlId={control_id}>
        <Form.Label>
          {icon}
          &nbsp;
          {label}
        </Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          size={size}
          value={value}
          onChange={e => {
            handleFieldValue(e.target.value)
          }}
        />
        <Form.Text className='text-muted'>{helper_text}</Form.Text>
      </Form.Group>
    )
  } else if (type === "select") {
    return (
      <Form.Group className='mb-3'>
        <Form.Label>
          {icon}&nbsp;{label}
        </Form.Label>
        <Form.Select
          aria-label={control_id}
          size={size}
          onChange={e => handleFieldValue(e.target.value)}
        >
          <option value=''>Choose one</option>
          {options &&
            options.map((opt, index) => (
              <option value={opt._id || opt} key={index}>
                {opt.name || opt}
              </option>
            ))}
        </Form.Select>
        <Form.Text className='text-muted'>{helper_text}</Form.Text>
      </Form.Group>
    )
  } else {
    return <p>no data type</p>
  }
}

export default FormFieldComponent
