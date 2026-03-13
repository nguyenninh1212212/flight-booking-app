function success(res :any, data = null, message = "Success", code = "SUCCESS", status = 200) {
  return res.status(status).json({
    code,
    message,
    data
  });
}

function error(res : any, message = "Internal error", code = "INTERNAL_ERROR", status = 500) {
  return res.status(status).json({
    code,
    message,
    data: null
  });
}

module.exports = {
  success,
  error
};
