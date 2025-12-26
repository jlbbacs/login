  import express from "express";
  import dotenv from "dotenv";
  import { connectDB } from "./config/db.js";
  import { protect } from "./middleware/auth.js";
  import userRoutes from './routes/auth.js';
  import cors from 'cors';

  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 5000;

  /* 🔌 DB */
  connectDB();

  /* 🧩 Middleware */
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* 🧪 User Routes */
  app.use('/api/users', userRoutes);

  /* 🧪 Protected test route */
  app.get("/api/user/profile", protect, (req, res) => {
    res.json(req.user);
  });



  /* 🚀 Start Server */
  app.listen(PORT, () => {
    console.log(`✅ Server started at port ${PORT}`);
  });

  app.post('/test-json', (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });

