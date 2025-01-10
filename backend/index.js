import express from "express"
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { ConnectMongo } from "./Config.js" 
ConnectMongo();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

const port = 9797;

app.use('/api/user', userRouter);


app.listen(port, () => {
  console.log(`Fixitnow app listening on port ${port}`)
})