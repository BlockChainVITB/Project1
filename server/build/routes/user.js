"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.verifyToken = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); //For creating token
const user_1 = require("../models/user");
const errors_1 = require("../errors");
const router = (0, express_1.Router)();
exports.userRouter = router;
// "localhost:3001/register "
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({ type: errors_1.UserErrors.USERNAME_ALREADY_EXISTS });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.UserModel({ username, password: hashedPassword });
        yield newUser.save();
        res.json({ message: "User Registered Successfully" });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        //To match the password saved and input password
        if (!isPasswordValid) {
            return res.status(400).json({ type: errors_1.UserErrors.WRONG_CREDENTIALS });
        } //When wrong password is entered
        const token = jsonwebtoken_1.default.sign({ id: user._id }, "secret"); //Creating encrypted version of object
        //Encrypted version of unique identifier will be our token
        res.json({ token, userID: user._id });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
}));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jsonwebtoken_1.default.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }
    return res.sendStatus(401); //Block request if wrong token send
};
exports.verifyToken = verifyToken;
