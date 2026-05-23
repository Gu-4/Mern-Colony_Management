const express = require("express");
const connectMongoose = require("./config/mongoose.js")
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/admin.js");
const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");
const guardRouter = require("./routes/guard.js");
const cors = require("cors")

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.static('public'));
app.use("/admin", adminRouter);
app.use("/guard", guardRouter);
app.use("/user", userRouter);
app.use("/", indexRouter);

const Port = 3000;
app.listen(Port, () => {
    console.log(`Server running on Port:${Port}`);
    connectMongoose();
})