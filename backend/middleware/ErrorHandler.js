// Express only treats middleware with exactly 4 parameters as an error handler, so `next` stays.
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
  if (status === 500) console.error(err);
  res.status(status).json({ error: err.message });
};
