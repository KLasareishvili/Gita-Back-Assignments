module.exports = (req, resp, next) => {
  const rand = Math.random();

  if (rand > 0.5) {
    return resp.status(401).json({ message: "random fact denied" });
  }
  next();
};
