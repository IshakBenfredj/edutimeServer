const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser");

// Import Routes
const authRoutes = require("./routes/auth-routes.js");
const courseRoutes = require("./routes/course-routes.js");
const commentRoutes = require("./routes/comment-routes.js");
const reservationRoutes = require("./routes/reservation-routes.js");
const userRoutes = require("./routes/user-routes.js");
const blogRoutes = require("./routes/blog-routes.js");
const postRoutes = require("./routes/post-routes.js");
const requestRoutes = require("./routes/request-routes.js");
const conversationRoutes = require("./routes/conversations-routes.js");
const messageRoutes = require("./routes/messages-routes.js");
const notificationRoutes = require("./routes/notification-routes.js");
const pubRoutes = require("./routes/pub-routes.js");
const { sendMailFromUserToTeam } = require("./middlewares/nodemailer.js");

const app = express();
const PORT = process.env.PORT || 8800;

dotenv.config();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

// Routes
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use("/reservations", reservationRoutes);
app.use("/posts", postRoutes);
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messageRoutes);
app.use("/requests", requestRoutes);
app.use("/notifications", notificationRoutes);
app.use("/pubs", pubRoutes);

app.use("/mail/send", async (req, res) => {
  try {
    const { message } = req.body;
    sendMailFromUserToTeam(message);
    res.status(200).json({ message: "تم إرسال الرسالة بنجاح" });
  } catch (error) {
    res.status(400).json({ error: "Server Error" });
  }
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("connected to db & listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });