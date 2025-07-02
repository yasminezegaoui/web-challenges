
export function createError(status, message, details = null) {
  const error = new Error(message);
  error.status = status;
  if (details) {
    error.details = details;
  }
  return error;
}

export function internalServerError(message = "Internal server error") {
  return createError(500, message);
}

export function unprocessable(message = "Unprocessable entity", details = null) {
  return createError(422, message, details);
}