module.exports = (req, resp, next) => {
  if (!req.body || !req.body.category || !req.body.price) {
    return resp.status(400).json({ message: "category and price is required" });
  }
  next();
};
