const express = require("express");
const passport = require('passport');
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const {port} = require("./config");
const {localLoginStrategy, JWTStrategy} = require("./auth/auth");


//app Septup
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());

passport.use("login", localLoginStrategy);
passport.use("jwt", JWTStrategy);

app.use("/userapi/register", registerRoute);
app.use("/userapi/login", loginRoute);
app.use("/userapi/user", passport.authenticate("jwt", {session: false}), userRoute);

app.listen(port, () => {
    console.log(`Userservice listening at http://localhost:${port}`);
})