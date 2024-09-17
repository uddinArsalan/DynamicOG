import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../constants.js";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
}

interface IUserMethods {
  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateAccessToken: () => Promise<string>;
  generateRefreshToken: () => Promise<string>;
}

export type UserModel = mongoose.Model<IUser, {}, IUserMethods>;
export type UserDocument = mongoose.HydratedDocument<IUser, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

//{ _id: this._id, email: this.email, name: this.name }

userSchema.methods.generateAccessToken = async function () {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: this._id, email: this.email, name: this.name },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        if (token) resolve(token);
      }
    );
  });
};

userSchema.methods.generateRefreshToken = async function () {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: this._id },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        if (token) resolve(token);
      }
    );
  });
};

export const User =
  mongoose.models?.User || mongoose.model<IUser, UserModel>("User", userSchema);
