import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user'

// Determines and returns if the user is logged in or not
export const getLoggedIn = async (req: Request, res: Response) => {
    const {username, email} = req;
    try {
        console.log("REACHED")
        const user = await User.findOne({username: username}, {isAdmin: 1});
        console.log(user);
        return res.status(200).json({
            loggedIn: true,
            username: username,
            email: email,
            isAdmin: user?.isAdmin
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    console.log("loginUser");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = await auth.signToken((existingUser._id).toString());
        console.log("token: " + token);

        // Change user's online status to true
        existingUser.onlineStatus = true;
        await existingUser.save();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            username: existingUser.username,
            email: existingUser.email              
        }).send()

    } catch (err) {
        console.error(err);
        res.status(500)
        .json({
            errorMessage: "Could not log in. Please try again later."
        })
        .send();
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    const {username} = req.body;
    await User.findOneAndUpdate({username: username}, {$set: {onlineStatus: false}});
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, passwordVerify } = req.body;
        console.log("create user: " + username + " " + email + " " + password + " " + passwordVerify);
        if (!username || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("all fields provided");

        // Password verification
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        console.log("password long enough");
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        console.log("password and password verify match");

        // Existing user
        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);

        const newUser = new User({
            // TODO: add rest of user data based on schema if any
            username, email, passwordHash
        });
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);

        // LOGIN THE USER
        const token = await auth.signToken((savedUser._id).toString());
        console.log("token:" + token);
        console.log("SAVEDUESR USERNAME: " + savedUser.username)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            username: savedUser.username,
            email: savedUser.email              
        }).send()

        console.log("token sent");

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.userId)
        console.log(req.userId)
        res.status(200).send()
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export * as AuthController from './auth-controller'