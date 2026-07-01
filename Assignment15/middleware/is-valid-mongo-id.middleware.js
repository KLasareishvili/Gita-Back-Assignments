const { isValidObjectId } = require("mongoose");

module.exports = async (req, resp, next) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return resp.status(400).json({ message: "Not valid mongo id" });
  }
  next();
};
