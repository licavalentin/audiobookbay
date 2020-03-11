module.exports = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: err.success,
    message: err.query
  });
};
