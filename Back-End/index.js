import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import bodyParser  from 'body-parser';
import db from './dataBase.js';
import { productRouter } from './route/product.js';

// server Setup 
const app = express();
const PORT = 3000;

db
// middlewares
app.use(bodyParser.json())
app.use(cors());
app.use('/api',productRouter)

app.listen(PORT , () => {
    console.log(`Server is running in ${PORT}`);
})