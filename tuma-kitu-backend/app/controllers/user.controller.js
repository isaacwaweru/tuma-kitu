const User = require("../models/user.model.js");
const sendEmail = require("../util/email.js");
const crypto = require("crypto");
const jwt = require("../util/jwt.js");
const AppError = require("../util/AppError.js");
const catchAsync = require("../util/catchAsync.js");
const bcrypt = require("bcrypt");

//login user
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(401).json({
        error: "User not found!",
      });
    }
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({
            error: "Incorrect details!",
          });
        }
        const token = jwt.sign({ userId: user._id });
        res.status(200).json({
          token: token,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  });
};

//Sign up user
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
      amount: 0,
      logs: [],
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "Account created successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: "User validation failed",
        });
      });
  });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

//Top up account
exports.topUp = (req, res) => {
  const userId = req.params.id;
  const newAmount = req.body.amount;
  User.find({ _id: userId }).then(function (user) {
    const updateAmount = user[0].amount + newAmount;
    User.findOneAndUpdate(
      { _id: userId },
      { $set: { amount: updateAmount } },
      { new: true },
      (error, doc) => {
        User.findById(userId, function (err, userr) {
          if (err) {
            return console.log(err);
          }
          userr.logs.push({
            amount: newAmount,
            trans_type: "Top up",
            time: Date.now(),
          });
          userr.save(function (err, editedMembers) {
            if (err) {
              return console.log(err);
            } else {
              return res.status(201).json({
                status: "success",
                message: "Top up successful!",
              });
            }
          });
        });
      }
    );
  });
};

//Send money
exports.sendMoney = (req, res) => {
  User.findOne({ phone: req.body.phone }).then((user) => {
    if (!user) {
      return res.status(201).json({
        status: "invalid",
        message: "Receipient not found!",
      });
    }
    try {
      const userId = req.params.id;
      const phoneNumber = req.body.phone;
      const transerAmount = req.body.amount;
      User.find({ _id: userId }).then(function (user) {
        const balance = user[0].amount;
        const newAmount = user[0].amount - transerAmount;
        if (balance < transerAmount || balance === 0) {
          return res.status(201).json({
            status: "invalid",
            message: "Insuffient Amount!",
          });
        }
        User.findOneAndUpdate(
          { _id: userId },
          { $set: { amount: newAmount } },
          { new: true },
          (error, doc) => {
            User.find({ phone: phoneNumber }).then(function (userTwo) {
              const currentAmount = userTwo[0].amount;
              const updatedNewAmount = currentAmount + transerAmount;
              const currentUser = userTwo[0]._id;
              User.findOneAndUpdate(
                { _id: currentUser },
                { $set: { amount: updatedNewAmount } },
                { new: true },
                (error, doc) => {
                  //User one sent
                  User.findById(userId, function (err, userr) {
                    if (err) {
                      return console.log(err);
                    }
                    userr.logs.push({
                      amount: transerAmount,
                      trans_type: "Sent",
                      time: Date.now(),
                    });
                    userr.save(function (err, editedMembers) {
                      if (err) {
                        return console.log(err);
                      } else {
                        //User two receive
                        User.findById(currentUser, function (err, userr) {
                          if (err) {
                            return console.log(err);
                          }
                          userr.logs.push({
                            amount: transerAmount,
                            trans_type: "Received",
                            time: Date.now(),
                          });
                          userr.save(function (err, editedMembers) {
                            if (err) {
                              return console.log(err);
                            } else {
                              return res.status(201).json({
                                status: "success",
                                message: "Transaction successful!!",
                              });
                            }
                          });
                        });
                      }
                    });
                  });
                }
              );
            });
          }
        );
      });
    } catch (error) {
      res.status(201).json({
        status: "invalid!",
        message: error,
      });
    }
  });
};
