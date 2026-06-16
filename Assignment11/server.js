const http = require("http");
const url = require("url");
const fs = require("fs/promises");

// 2) შექმენით სერვერი რომელიც უპასუხებს შემდეგი ტიპის რექუესთებს:
// GET  /about დააბრუნეთ რაიმე ტიპის ინფორმაცია მაგალითად, სახელი, გვარი, ჰობი და ა.შ

// GET /players უნდა დააბრუნოს მაისივი ფეხბურთელების რომელსაც წაიკითხავთ players.json დან fs მოდულით

// GET /players?nation=georgia უდნა დააბრუნოს მხოლოდ ქართველი ფეხბურთელები

// GET /players?nation=germany მხოლოდ გერმანელი ფეხბურტელები და ა.შ

// POST /players უნდა გაატანოთ ფეხბურთელის ყველა მონაცემები ბექენდში დაადოთ ვალიდაცია და ჩაწეროთ players.json ში.

// DELETE /players/1 წაშლის კონკრეტულ ფეღბურთელს და განაახლებს players.json-ს

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "GET" && parsedUrl.pathname === "/about") {
    const readData = await fs.readFile("players.json", "utf-8");
    const players = JSON.parse(readData);

    const random = Math.floor(Math.random() * 50);
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(players[random]));
  }

  if (req.method === "GET" && parsedUrl.pathname === "/players") {
    const readData = await fs.readFile("players.json", "utf-8");
    const players = JSON.parse(readData);

    res.writeHead(200, { "content-type": "application/json" });

    if (parsedUrl.query.nation) {
      const nationPlayers = players.filter(
        (p) => p.Nation.toLowerCase() === parsedUrl.query.nation.toLowerCase(),
      );
      return res.end(JSON.stringify(nationPlayers));
    }

    return res.end(JSON.stringify(players));
  }

  if (req.method === "POST" && parsedUrl.pathname === "/players") {
    const readData = await fs.readFile("players.json", "utf-8");
    const players = JSON.parse(readData);

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      const parsedBody = JSON.parse(body);

      if (!parsedBody.Name || !parsedBody.Nation || !parsedBody.Age) {
        res.writeHead(400, { "content-type": "application/json" });
        return res.end(JSON.stringify({ message: "invalid player data" }));
      }

      const lastId = players[players.length - 1]?.id || 0;

      const newPlayer = {
        id: lastId + 1,
        Name: parsedBody.Name,
        Nation: parsedBody.Nation,
        Age: parsedBody.Age,
      };

      players.push(newPlayer);
      await fs.writeFile("players.json", JSON.stringify(players));
      res.writeHead(201, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({ message: "player created successfully" }),
      );
    });
  }

  if (req.method === "DELETE" && parsedUrl.pathname.startsWith("/players")) {
    const readData = await fs.readFile("players.json", "utf-8");
    const players = JSON.parse(readData);

    const playerId = parsedUrl.pathname.split("/")[2];
    const index = players.findIndex((player) => player.id === Number(playerId));
    if (index === -1) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "player not found" }));
    }

    players.splice(index, 1);
    await fs.writeFile("players.json", JSON.stringify(players));

    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "player deleted successfully" }));
  }
});

server.listen(4000, () => {
  console.log("server running on port http://localhost:4000");
});
