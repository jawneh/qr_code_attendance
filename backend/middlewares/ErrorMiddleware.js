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

  req.body.error = { status_code, message, stack: err.stack }

  if (typeof message == "string") {
    res.status(status_code).json({ msgUser: message, status_code })
  } else {
    res.status(status_code).json({ ...message, status_code })
  }
}
