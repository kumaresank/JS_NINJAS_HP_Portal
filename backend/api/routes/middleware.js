const { errorToHttpErrorPayload, HttpError, userDataToSend } = require("./helpers")
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User")

const asyncHttpErrorWrapper = (controllerFn) => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      console.error("HTTP Uncaught error!!!")
      const payload = errorToHttpErrorPayload(error)
      console.error(error)
      return res.status(payload.status).jsonp(payload)
    }
  };
};
  
const errorHandler = (error, req, res, next) => {
  console.error("HTTP Uncaught error!!!")
  const payload = errorToHttpErrorPayload(error)
  console.error(error)
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


const attachUser = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    throw new HttpError({
      status: 401, code: "bad_request", message: 'User not logged in'
    })
  }

  let userId;
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
  } catch (e) {
    throw new HttpError({
      status: 401, code: "bad_request", message: 'Please login to access'
    })
  }
  if (!userId) {
    throw new HttpError({
      status: 401, code: "bad_request", message: 'User not found'
    })
  }

  // Fetch user from db
  const user = await UserModel.findOne({_id: userId});
  if (!user) {
    throw new HttpError({
      status: 401, code: "bad_request", message: 'User not found'
    })
  }

  req.user = userDataToSend(user)
  next()
}

module.exports = {
  asyncHttpErrorWrapper,
  errorHandler,
  combineParamsAndBodyData,
  attachUser
}