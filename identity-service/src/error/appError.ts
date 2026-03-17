class AppError extends Error {
  statusCode: any;
  code: string;
  constructor(
    message: string | undefined,
    statusCode: number = 500,
    code: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}
export default AppError;
