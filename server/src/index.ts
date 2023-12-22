import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors())

// mongoose.connect();

app.listen(3000,()=>{
    console.log('Server on port 3000');   
})

