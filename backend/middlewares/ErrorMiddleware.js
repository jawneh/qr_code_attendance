module.exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

module.exports.errorHandler = (err, req, res, next) => {
  const status_code = err.response
    ? err.response.status
    : res.statusCode == 200
    ? 500
    : res.statusCode

  const message = err.response
    ? err.response.data
    : err.message
    ? err.message
    : "uncaught error message"
  // console.log(err)
  console.log(message)
  res.status(status_code).json({ message, status_code })
}
