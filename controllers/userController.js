const User = require("../models/userModel");

const { getPostData } = require("../utils/utils");

// @desc    Gets All User
// @route   GET /api/user
async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single User
// @route   GET /api/users/:id
async function getUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Creates a User
// @route   POST /api/users
async function createUser(req, res) {
  try {
    const body = await getPostData(req);

    const { gender, img, username, name, email } = JSON.parse(body);

    const user = {
      gender,
      img,
      username,
      name,
      email,
    };

    const newUser = await User.create(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a User
// @route   PUT /api/users/:id
async function updateUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      const body = await getPostData(req);

      const { gender, img, username, name, email } = JSON.parse(body);

      const userData = {
        gender: gender || user.gender,
        img: img || user.img,
        username: username || user.username,
        name: name || user.name,
        email: email || user.email,
      };

      const updateUser = await User.update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updateUser));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete User
// @route   DELETE /api/users/:id
async function deleteUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      await User.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
