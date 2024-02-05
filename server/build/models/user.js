"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// creating a new schema instance 
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    availableBitcoin: { type: Number, default: 5000 },
    // purchasedItems
});
// 
exports.UserModel = (0, mongoose_1.model)('user', UserSchema);
// created a model of collection name user and schema type of UserSchema
// A model is a class with which we construct documents. 
// In this case, UserModel is a model where each document is a user with properties and behaviors as declared in our schema. The first argument is the name of the collection in MongoDB, and the second argument is the schema to be used for documents in that collection
