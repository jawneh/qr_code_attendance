import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Moment from "react-moment"
import { AbsoluteCenter } from "./CustomStyledComponents"
import { getAttendancesAction } from "../redux/attendance/Actions"
import TabulateComponent from "./TabulateComponent"
import { Link } from "react-router-dom"
import { X, EyeFill } from "react-bootstrap-icons"

const AttendanceListComponent = () => {
  const dispatch = useDispatch()
  const fetchAttendances = useSelector(state => state.fetchAttendances)
  const { loading, error, attendances } = fetchAttendances

  const columns = [
    { name: "s/n", selector: row => row.s_n, sortable: true, width: "10%" },
    { name: "Date", selector: row => row.created_at, sortable: true, width: "20%" },
    { name: "Course", selector: row => row.course, sortable: true, width: "20%" },
    {
      name: "Start time",
      selector: row => row.start_time,
      sortable: true,
      width: "20%",
    },
    { name: "End time", selector: row => row.end_time, sortable: true, width: "20%" },
    { name: "", selector: row => row.view, sortable: false, button: true, width: "10%" },
  ]

  const table_data = attendances.map((x, index) => ({
    s_n: index + 1,
    created_at: <Moment format='Do MMMM YYYY'>{x.createdAt}</Moment>,
    course: x.course_id && x.course_id.code,
    start_time: x.start_time,
    end_time: x.end_time,
    view: (
      <Link to={`/attendance/${x._id}`}>
        <EyeFill color='green' size={"1.5rem"} />{" "}
      </Link>
    ),
  }))

  useEffect(() => {
    dispatch(getAttendancesAction())
  }, [dispatch])

  return (
    <AbsoluteCenter max_width='75vw'>
      <TabulateComponent
        title='Attendances'
        columns={columns}
        table_data={table_data}
        loading={loading}
        error={error}
      />
    </AbsoluteCenter>
  )
}

export default AttendanceListComponent
