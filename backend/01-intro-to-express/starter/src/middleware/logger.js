export default function logger(req, res, next) {
  console.log("Request Headers:", req.headers);

  const logMessage = `[${new Date().toISOString()}] ${req.method} /posts - Headers: ${JSON.stringify(req.headers)} - Body: ${JSON.stringify(req.body)}`
  console.log(logMessage)
  next();
}
