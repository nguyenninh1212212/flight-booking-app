const success = (
  res: any,
  data: any = null,
  message = "Success",
  code = "SUCCESS",
  status = 200,
) => {
  return res.status(status).json({
    code,
    message,
    data,
  });
};

const error = (
  res: any,
  message = "Internal error",
  code = "INTERNAL_ERROR",
  status = 500,
) => {
  return res.status(status).json({
    code,
    message,
    data: null,
  });
};

export { success, error };
