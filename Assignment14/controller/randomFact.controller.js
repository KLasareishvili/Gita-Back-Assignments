const RandomFactService = require("../service/randomFact.service");

exports.getRandomFact = async (req, resp) => {
  try {
    const fact = await RandomFactService.getRandomFact();
    resp.status(200).json(fact);
  } catch (err) {
    resp.status(502).json({ message: "could not fetch random fact" });
  }
};
