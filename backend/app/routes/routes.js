module.exports = (app) => {
  const auth = require("../middleware/auth.js");
  const users = require("../controllers/user.controller.js");

  // User sign up
  app.post("/register", users.signup);

  // user login
  app.post("/login", users.login);

  // Retrieve all users
  app.get("/users", auth, users.findAll);

  // Retrieve a single user with usersId
  app.get("/users/:userId", auth, users.findOne);

  //Top up your account
  app.patch("/topUp/:id", auth, users.topUp);

  //Send money
  app.patch("/send/:id", auth, users.sendMoney);
};
