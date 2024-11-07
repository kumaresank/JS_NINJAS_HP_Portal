const { errorToHttpErrorPayload, HttpError } = require("./helpers")

const asyncHttpErrorWrapper = (controllerFn) => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      console.error("HTTP Uncaught error!!!")
      const payload = errorToHttpErrorPayload(error)
      console.error(payload.stackTrace || payload.message)
      return res.status(payload.status).jsonp(payload)
    }
  };
};
  
const errorHandler = (error, req, res, next) => {
  console.error("HTTP Uncaught error!!!")
  const payload = errorToHttpErrorPayload(error)
  console.error(payload.stackTrace || payload.message)
  return res.status(payload.status).jsonp(payload)
};


const combineParamsAndBodyData = (schema) => (req, res, next) => {
  const combinedData = { ...req.params, ...req.body };
  const result = schema.safeParse(combinedData);

  if (!result.success) {
    // Extract error messages and join them by new lines
    const errorMessage = result.error.errors
      .map((err) => `${err.path.join('.')} - ${err.message}`)
      .join('\n');
    
    // Throw an HttpError with the combined message
    throw new HttpError({
      status: 400,
      code: "bad_request",
      message: `${errorMessage}`,
      data: result.error.errors
    });
  }

  req.data = result.data; // Store validated data in `req`
  next();
};


const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Auth Error' });
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (e) {
      res.status(400).send({ message: 'Invalid Token' });
  }
}

module.exports = {
  asyncHttpErrorWrapper,
  errorHandler,
  combineParamsAndBodyData,
  auth
}