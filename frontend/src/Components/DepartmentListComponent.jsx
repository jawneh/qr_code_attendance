import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AbsoluteCenter } from "./CustomStyledComponents"
import { fetchDepartmentsAction } from "../redux/departments/Actions"
import TabulateComponent from "./TabulateComponent"
import { Link } from "react-router-dom"
import { EyeFill } from "react-bootstrap-icons"

const DepartmentListComponent = () => {
  const dispatch = useDispatch()

  const fetchDepartments = useSelector(state => state.fetchDepartments)
  const { loading, error, departments } = fetchDepartments

  const columns = [
    { name: "s/n", selector: row => row.s_n, sortable: true, width: "10%" },
    { name: "Title", selector: row => row.name, sortable: true, width: "40%" },
    { name: "Faculty", selector: row => row.faculty, sortable: true, width: "40%" },
    { name: "", selector: row => row.view, sortable: false, button: true, width: "10%" },
  ]

  const table_data = departments.map((x, index) => ({
    s_n: index + 1,
    name: x.name,
    faculty: x.faculty_id,
    view: (
      <Link to={`/department/${x._id}`}>
        <EyeFill color='green' size={"1.5rem"} />{" "}
      </Link>
    ),
  }))

  useEffect(() => {
    dispatch(fetchDepartmentsAction())
  }, [dispatch])

  return (
    <AbsoluteCenter max_width='75vw'>
      <TabulateComponent
        title='Faculties'
        columns={columns}
        table_data={table_data}
        loading={loading}
        error={error}
      />
    </AbsoluteCenter>
  )
}

export default DepartmentListComponent
