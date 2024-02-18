import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import cron from "node-cron";

// Import Routes
import authRoutes from "./routes/auth-routes.js";
import courseRoutes from "./routes/course-routes.js";
import commentRoutes from "./routes/comment-routes.js";
import reservationRoutes from "./routes/reservation-routes.js";
import userRoutes from "./routes/user-routes.js";
import articleRoutes from "./routes/article-routes.js";

const app = express();
const PORT = process.env.PORT || 8800;

dotenv.config();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use("/reservations", reservationRoutes);
app.use("/articles", articleRoutes);
app.use("/comments", commentRoutes);

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
