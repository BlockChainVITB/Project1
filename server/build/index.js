"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./routes/user");
// import {userRouter} from './routes/user'; 
// import {productRouter} from './routes/product';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // to allow cross origin requests 
// allow us to access the api from any domain
// app.use('/user',userRouter); // mounting the router to the app 
// app.use('/product',productRouter); 
app.use("/user", user_1.userRouter);
mongoose_1.default.connect("mongodb://localhost:27017").then(client => {
    console.log('Connected to MongoDB database!');
});
app.listen(3000, () => {
    console.log('Server on port 3000');
});
