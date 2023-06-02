import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const port = +process.env.PORT || 4000

const app = express();
app
    .use(cors())
    .use(express.json())

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
