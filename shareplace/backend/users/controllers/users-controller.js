import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Place from "../../places/models/Place.js";

export default class UserContrl {
  static getUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const singleUser = await User.findById(userId);
      res.status(200).json({ name: singleUser.name });
    } catch (err) {
      return next(new Error("could not find the user with the provided id"));
    }
  };

  static signup = async (req, res, next) => {
    const { email, name, password } = req.body;
    /* check if the email is already available in the database */
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return next(new Error("something went wrong in finding the user"));
    }
    if (existingUser) {
      return next(
        new Error(
          "an user with the same email, already exist, try with another email"
        )
      );
    }

    /* if the info passed all the test above then register the user */
    let hashedPassword;
    try {
      hashedPassword = await bcryptjs.hash(password, 12);
    } catch (err) {
      return next(new Error("could create the user, Plaese try again"));
    }

    const newUser = new User({ name, email, password: hashedPassword });
    try {
      await newUser.save();
    } catch (err) {
      return next(
        new Error("something went wrong, Could not reister the user")
      );
    }

    /* include with the response a token */
    let token;
    try {
      token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        "top_secret_private_key",
        { expiresIn: "1h" }
      );
    } catch (err) {
      return next(
        new Error("something went wrong, Could not reister the user")
      );
    }

    res.status(201).json({ token, userId: newUser.id });
  };

  static login = async (req, res, next) => {
    const { email, password } = req.body;
    /* chek if there is user with the entered email */
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return next(new Error("somthing went wrong, Please try again"));
    }

    if (!existingUser) {
      return next(new Error("the password or the email is not valid"));
    }
    /* check the entered password */
    let passwordIsValid;
    try {
      passwordIsValid = await bcryptjs.compare(password, existingUser.password);
    } catch (error) {
      return next(new Error("something went wrong , please try again"));
    }

    if (!passwordIsValid) {
      return next(new Error("the password or the email is not valid"));
    }

    /** if the entered info passed all the tests then logged the user */
    /* include with the response a token */
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        "top_secret_private_key",
        { expiresIn: "1h" }
      );
    } catch (err) {
      return next(
        new Error("something went wrong, Could not reister the user")
      );
    }
    res.setHeader("Set-Cookie", `token=${token}`);

    res.status(200).json({
      message: "logged in with success !!",
      token,
      userId: existingUser.id,
    });
  };

  static getAllUsers = async (req, res, next) => {
    let users;
    try {
      users = await User.find({});
    } catch (err) {
      return next(new Error("something went wrong, Please try again"));
    }
    if (!users) {
      return res
        .json(404)
        .json("Could find any users, Maybe you should register one");
    }
    res
      .status(200)
      .json({ users: users.map((user) => user.toObject({ getters: true })) });
  };

  static deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
      /** typicaly that should executed in a transaction*/
      const deletedUser = await User.findByIdAndDelete(userId);
      /**then delete all places created by this user */
      const deletedPlace = await Place.deleteMany({
        creator: userId,
      });
      res.status(203).json({ message: "user was deleted with succes" });
    } catch (error) {
      return next(new Error("could not delete the user for the provided id"));
    }
  };

  static resetPassword = async (req, res, next) => {
    const userId = req.params.id;
    const { password } = req.body;
    /**hashing the password  */
    let hashedPassword;
    try {
      hashedPassword = await bcryptjs.hash(password, 12);
    } catch (err) {
      return next(new Error("could not reset the password, Please try again"));
    }

    try {
      await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { useFindAndModify: false }
      );
    } catch (err) {
      return next(
        new Error(
          "could not reset the password for the provided id, please try again"
        )
      );
    }
    res.status(200).json({ message: "the password was reset with sccess!!" });
  };

  static searchUserByName = async (req, res, next) => {
    const pattern = req.params.pattern;
    try {
      const findedUser = await User.find({ name: { $regex: `/${pattern}/` } });
      res.status(202).json({ findedUser });
    } catch (err) {
      console.log(err);
      return next(new Error("something went wrong, please try again"));
    }
  };
}
