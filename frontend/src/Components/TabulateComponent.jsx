import React from "react"
import DataTable from "react-data-table-component"
import LoaderComponent from "./LoaderComponent"
import AlertComponent from "./AlertComponent"
const TabulateComponent = ({ title, loading, columns, table_data, error }) => {
  return (
    <>
      <DataTable
        title={title}
        columns={columns}
        progressPending={loading}
        progressComponent={<LoaderComponent />}
        striped={true}
        highlightOnHover={true}
        noDataComponent={
          <AlertComponent variant={error ? "danger" : "info"}>
            {error ? error : "No data to display"}
          </AlertComponent>
        }
        pagination={true}
        theme='light'
        data={table_data}
      />
    </>
  )
}

export default TabulateComponent
