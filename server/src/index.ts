import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// import {userRouter} from './routes/user'; 
// import {productRouter} from './routes/product';

const app = express();

app.use(express.json());
app.use(cors()) // to allow cross origin requests 
// allow us to access the api from any domain

// app.use('/user',userRouter); // mounting the router to the app 
// app.use('/product',productRouter); 

mongoose.connect(
    "mongodb+srv://avyaanverma:hkn7B25lrTynppNV@cluster0.vg9tcof.mongodb.net/"
).then(client => {
    console.log('Connected to MongoDB database!');
})
app.listen(3000,()=>{
    console.log('Server on port 3000');   
})

