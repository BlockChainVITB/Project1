import {Schema, model} from 'mongoose';
// Schema is used to define the structure of the document within a collection of MongoDB. 
// model is a wrapper on the Mongoose schema


export interface IUser{ // defining an interface IUser
    _id?:string;
    username:string;
    password:string;
    availableBitcoin:number;
    // purchasedItems:string[];
}

// creating a new schema instance 
const UserSchema = new Schema<IUser>({
    username: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    availableBitcoin: {type:Number, default:5000},
    // purchasedItems
}
);


// 
export const UserModel = model<IUser>('user', UserSchema) 
// created a model of collection name user and schema type of UserSchema
// A model is a class with which we construct documents. 
// In this case, UserModel is a model where each document is a user with properties and behaviors as declared in our schema. The first argument is the name of the collection in MongoDB, and the second argument is the schema to be used for documents in that collection