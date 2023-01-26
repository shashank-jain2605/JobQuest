const errorHandlerMiddleware = (error, req, res, next) => {
  res.status(500).json({ msg: `there was an error ${error}` });
};

export default errorHandlerMiddleware;
