const notFound = (req, res, next) => {
   const error = new Error(
      `middleware/error :Not found- ${req.originalUrl}`
   );
   res.status(404);
   next(error);
};

const errorHandler = (err, req, res, next) => {
   res.status(res.statusCode);
   res.json({
      message: err.message,
      stack: err.stack,
   });
};

module.exports = { notFound, errorHandler };