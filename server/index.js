import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import coachingRouter from './routes/coachingRouter.js';

dotenv.config();

const port = 5000;

const app = express();
//app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});

app.use(
  express.urlencoded({ extended: true })
);
 
app.use(express.json({ limit: '10mb' }));
app.use('/user', userRouter);
app.use('/coaching', coachingRouter);
app.use('/', (req, res) => res.json({ message: 'Welcome to our API' }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

const startServer = async () => {
  try {
    // connect to mongodb
    await mongoose.connect(process.env.MongoConnect);
    console.log("Mongo Db connected")
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();