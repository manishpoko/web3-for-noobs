import express from "express";
import cors from 'cors'


import authRoutes from './routes/authRoutes.ts'
import postRoutes from './routes/postRoutes.ts'
const app = express();
const port = 3001;


app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend server initiated!");
});

app.listen(port, () => {
  console.log("listening from port 3001");
});

app.use('/api/posts', postRoutes);





app.use('/api/auth', authRoutes);

export default app;
