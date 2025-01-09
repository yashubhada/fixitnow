import express from "express"
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import { ConnectMongo } from "./Config.js" 
ConnectMongo();

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = 9797

app.use('/api/user', userRouter);


app.listen(port, () => {
  console.log(`Fixitnow app listening on port ${port}`)
})