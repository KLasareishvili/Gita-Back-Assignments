module.exports = (req, resp, next) => {
  const secret = req.headers["secret"];
  if (secret !== "random123") {
    return resp.status(401).json({ message: "delete denied" });
  }
  next();
};
