import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AbsoluteCenter } from "./CustomStyledComponents"
import { fetchFacultiesAction } from "../redux/faculties/Actions"
import TabulateComponent from "./TabulateComponent"
import { Link } from "react-router-dom"
import { EyeFill } from "react-bootstrap-icons"

const FacultyListComponent = () => {
  const dispatch = useDispatch()
  const { loading, error, faculties } = useSelector(state => state.fetchFaculties)

  const columns = [
    { name: "s/n", selector: row => row.s_n, sortable: true, width: "10%" },
    { name: "Title", selector: row => row.name, sortable: true, width: "40%" },
    { name: "Departments", selector: row => row.departments, sortable: true, width: "40%" },
    { name: "", selector: row => row.view, sortable: false, button: true, width: "10%" },
  ]

  const table_data = faculties.map((x, index) => ({
    s_n: index + 1,
    name: x.name,
    departments: x.departments.length,
    view: (
      <Link to={`/faculty/${x._id}`}>
        <EyeFill color='green' size={"1.5rem"} />{" "}
      </Link>
    ),
  }))

  useEffect(() => {
    dispatch(fetchFacultiesAction())
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

export default FacultyListComponent
