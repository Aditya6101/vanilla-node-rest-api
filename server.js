const http = require("http");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./controllers/userController");

const regex = new RegExp(/\/api\/users\/\w+/);

const server = http.createServer((req, res) => {
  // Gets All user
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  }
  // Gets User
  else if (req.url.match(regex) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getUser(req, res, id);
  }
  // Add User
  else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  }
  // Update User
  else if (req.url.match(regex) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  }
  // Delete User
  else if (req.url.match(regex) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteUser(req, res, id);
  }
  // Incorrect URL
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
