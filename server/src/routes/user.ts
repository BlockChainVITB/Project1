import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; //For creating token
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../errors";
const router = Router();

// "localhost:3001/register "

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body; // Destructure username and password from req.body
  console.log(req.body);
  if (!username || !password) { // Check if username or password is missing
    return res.status(400).json({ message: "Username and password are required" });
  }
  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //To match the password saved and input password

    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    } //When wrong password is entered

    const token = jwt.sign({id: user._id},"secret"); //Creating encrypted version of object
    //Encrypted version of unique identifier will be our token

    res.json({token,userID: user._id});
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

export const verifyToken = (req: Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader,"secret",(err) =>{
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }

    return res.sendStatus(401); //Block request if wrong token send
};

export { router as userRouter }; //Changing name
