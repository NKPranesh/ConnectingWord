const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/authMiddleware");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const { use } = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

const dbURI =
  "mongodb+srv://connectingworld:connectingworld@cluster0.xcbar.mongodb.net/connectingworld";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(4000, () => {
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
  let userEmail = null;
  if (token) {
    jwt.verify(token, "philanterfakadi", async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let user = await User.findById(decodedToken.id);
        userEmail = user.email;

        if (user.friends.length !== 0) {
          console.log(user.friends);
          for (let i = 0; i < user.friends.length; i++) {
            friendsList.push({
              email: user.email,
              friendEmail: user.friends[i],
            });

            let friend1 = await User.findOne({ email: user.friends[i] });
            if (friend1.friends.length !== 0) {
              for (let j = 0; j < friend1.friends.length; j++) {
                friendsList.push({
                  email: friend1.email,
                  friendEmail: friend1.friends[j],
                });

                let friend2 = await User.findOne({ email: friend1.friends[j] });

                if (friend2.friends.length !== 0) {
                  for (let k = 0; k < friend2.friends.length; k++) {
                    friendsList.push({
                      email: friend2.email,
                      friendEmail: friend2.friends[k],
                    });
                  }
                }
              }
            }
          }
        }
        res.send({ friendsList, userEmail });
      }
    });
  }
});

app.post("/add-friend", requireAuth, async (req, res) => {
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "philanterfakadi", async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let user = await User.findById(decodedToken.id);
      }
    });
  }
});
