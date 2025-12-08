import express from "express";

import authRoutes from './routes/authRoutes.ts'
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend server initiated!");
});

app.listen(port, () => {
  console.log("listening from port 3001");
});

app.use('/api/auth', authRoutes);

export default app;
