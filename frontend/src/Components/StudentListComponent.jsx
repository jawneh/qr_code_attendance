import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AbsoluteCenter } from "./CustomStyledComponents"
import { usersGetAction } from "../redux/users/Actions"
import TabulateComponent from "./TabulateComponent"

const StudentListComponent = () => {
  const dispatch = useDispatch()
  const { loading, error, users } = useSelector(state => state.usersGet)

  const columns = [
    { name: "s/n", selector: row => row.s_n, sortable: true, width: "5%" },
    { name: "Matric Number", selector: row => row.university_id, sortable: true, width: "10%" },
    { name: "First name", selector: row => row.first_name, sortable: true, width: "10%" },
    { name: "Last number", selector: row => row.last_name, sortable: true, width: "15%" },
    { name: "Faculty", selector: row => row.faculty, sortable: true, width: "15%" },
    { name: "Department", selector: row => row.department, sortable: true, width: "15%" },
    { name: "Email", selector: row => row.email, sortable: true, width: "15%" },
    { name: "Phone", selector: row => row.phone, sortable: false, width: "10%" },
  ]

  const table_data =
    users.length > 0
      ? users.map((x, index) => ({
          s_n: index + 1,
          university_id: x.university_id,
          first_name: x.first_name,
          last_name: x.last_name,
          faculty: x.faculty_id.name,
          department: x.department_id.name,
          email: x.email,
          phone: x.phone,
        }))
      : []

  useEffect(() => {
    dispatch(usersGetAction())
  }, [dispatch])

  return (
    <AbsoluteCenter max_width='75vw'>
      <TabulateComponent
        title='Students'
        columns={columns}
        table_data={table_data}
        loading={loading}
        error={error}
      />
    </AbsoluteCenter>
  )
}

export default StudentListComponent
