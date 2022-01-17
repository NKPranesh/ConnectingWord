const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/authMiddleware");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { use } = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://connectingworldapp.web.app"
  );
  //test
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
const checkDuplicates = (friendsList, a, b) => {
  let duplicate = false;
  for (let i = 0; i < friendsList.length; i++) {
    if (friendsList[i].email === a && friendsList[i].friendEmail === b)
      duplicate = true;
    if (friendsList[i].email === b && friendsList[i].friendEmail === a)
      duplicate = true;
  }
  return duplicate;
};

const checkDuplicateNodes = (nodes, email) => {
  let duplicate = false;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].email === email) duplicate = true;
  }

  return duplicate;
};

const dbURI =
  "mongodb+srv://connectingworld:connectingworld@cluster0.xcbar.mongodb.net/connectingworld";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(port, () => {
      console.log("Server running on port 4000");
    })
  )
  .catch((err) => console.log(err));

app.use(authRoutes); //login, signup routes

app.get("/authenticate", requireAuth, (req, res) => {
  res.json({ status: "authenticated" });
});

app.get("/usertable", requireAuth, (req, res) => {
  User.find({}, function (err, users) {
    if (err) {
      console.log(err);
    }
    res.send(users);
  });
});

// list of requests user has sent
app.get("/requests-list", requireAuth, async (req, res) => {
  let token = req.cookies.jwt;
  let requestList = [];
  if (token) {
    jwt.verify(token, "philanterfakadi", async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let user = await User.findById(decodedToken.id);
        for (let i = 0; i < user.requests.length; i++) {
          let obj = {
            fromEmail: user.email,
            toEmail: user.requests[i],
          };
          requestList.push(obj);
        }
        res.send(requestList);
      }
    });
  }
});

app.get("/friends-list", requireAuth, async (req, res) => {
  let token = req.cookies.jwt;
  let friendsList = [];
  let nodes = [];
  let userEmail = null;
  if (token) {
    jwt.verify(token, "philanterfakadi", async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let user = await User.findById(decodedToken.id);
        nodes.push({
          name: user.name,
          email: user.email,
          coordinates: [user.longitude, user.latitude],
          occupation: user.occupation,
          tooltip: user.name,
        });
        userEmail = user.email;

        if (user.friends.length !== 0) {
          for (let i = 0; i < user.friends.length; i++) {
            let friend1 = await User.findOne({ email: user.friends[i] });
            if (
              checkDuplicates(friendsList, user.email, friend1.email) === false
            ) {
              friendsList.push({
                email: user.email,
                friendEmail: friend1.email,
                start: [user.longitude, user.latitude],
                end: [friend1.longitude, friend1.latitude],
                tooltip: `${user.name} to ${friend1.name}`,
              });
              if (checkDuplicateNodes(nodes, friend1.email) === false) {
                nodes.push({
                  name: friend1.name,
                  email: friend1.email,
                  coordinates: [friend1.longitude, friend1.latitude],
                  occupation: friend1.occupation,
                  tooltip: friend1.name,
                });
              }

              if (friend1.friends.length !== 0) {
                for (let j = 0; j < friend1.friends.length; j++) {
                  let friend2 = await User.findOne({
                    email: friend1.friends[j],
                  });
                  if (
                    checkDuplicates(
                      friendsList,
                      friend1.email,
                      friend2.email
                    ) === false
                  ) {
                    friendsList.push({
                      email: friend1.email,
                      friendEmail: friend2.email,
                      start: [friend1.longitude, friend1.latitude],
                      end: [friend2.longitude, friend2.latitude],
                      tooltip: `${friend1.name} to ${friend2.name}`,
                    });
                    if (checkDuplicateNodes(nodes, friend2.email) === false) {
                      nodes.push({
                        name: friend2.name,
                        email: friend2.email,
                        coordinates: [friend2.longitude, friend2.latitude],
                        occupation: friend2.occupation,
                        tooltip: friend2.name,
                      });
                    }
                    if (friend2.friends.length !== 0) {
                      for (let k = 0; k < friend2.friends.length; k++) {
                        let friend3 = await User.findOne({
                          email: friend2.friends[k],
                        });
                        if (
                          checkDuplicates(
                            friendsList,
                            friend2.email,
                            friend3.email
                          ) === false
                        ) {
                          friendsList.push({
                            email: friend2.email,
                            friendEmail: friend3.email,
                            start: [friend2.longitude, friend2.latitude],
                            end: [friend3.longitude, friend3.latitude],
                            tooltip: `${friend2.name} to ${friend3.name}`,
                          });
                          if (
                            checkDuplicateNodes(nodes, friend3.email) === false
                          ) {
                            nodes.push({
                              name: friend3.name,
                              email: friend3.email,
                              coordinates: [
                                friend3.longitude,
                                friend3.latitude,
                              ],
                              occupation: friend3.occupation,
                              tooltip: friend3.name,
                            });
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        res.send({ friendsList, userEmail, nodes });
      }
    });
  }
});

app.post("/add-friend", requireAuth, async (req, res) => {
  let token = req.cookies.jwt;
  let reqEmail = req.body.reqEmail;
  if (token) {
    jwt.verify(token, "philanterfakadi", async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let user = await User.findById(decodedToken.id);
        user.requests.push(reqEmail);
        await user.save().then((data) => {
          res.status(200).json({ success: "success" });
        });
      }
    });
  }
});

// list of requests user has recieved
app.get("/user-request-list", async (req, res) => {
  let token = req.cookies.jwt;
  let userReqList = [];
  if (token) {
    jwt.verify(token, "philanterfakadi", async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let user = await User.findById(decodedToken.id);
        User.find({}, function (err, users) {
          if (err) {
            console.log(err);
          } else {
            for (let i = 0; i < users.length; i++) {
              if (users[i].email === user.email) continue;
              if (users[i].requests.includes(user.email)) {
                userReqList.push({
                  email: users[i].email,
                  name: users[i].name,
                });
              }
            }
            res.send(userReqList);
          }
        });
      }
    });
  }
});

app.post("/reject-request", requireAuth, (req, res) => {
  let token = req.cookies.jwt;
  let reqEmail = req.body.reqEmail;
  if (token) {
    jwt.verify(token, "philanterfakadi", async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let loginUser = await User.findById(decodedToken.id);
        const removeUser = await User.findOne({ email: reqEmail });

        const index = removeUser.requests.indexOf(loginUser.email);
        removeUser.requests.splice(index, 1);
        await removeUser.save().then((data) => {
          res.status(200).json({ success: "success" });
        });
      }
    });
  }
});

app.post("/accept-request", requireAuth, (req, res) => {
  let token = req.cookies.jwt;
  let reqEmail = req.body.reqEmail;
  if (token) {
    jwt.verify(token, "philanterfakadi", async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let loginUser = await User.findById(decodedToken.id);
        const friendUser = await User.findOne({ email: reqEmail });
        loginUser.friends.push(friendUser.email);
        friendUser.friends.push(loginUser.email);
        await loginUser.save().then((data) => {});
        await friendUser.save().then((data) => {});
        res.send("success");
      }
    });
  }
});

app.get("/test-api", (req, res) => {
  res.status(201).json({ message: "Back-end is working good." });
});
