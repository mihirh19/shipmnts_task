require('dotenv').config()
const express = require('express')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const generateToken = require('../generateToken')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please enter all the fields.");
   }

   const userExistsEMail = await User.findOne({ email });

   if (userExistsEMail) {
      res.status(409);
      throw new Error("User already exists with this email.");
   }

   const user = await User.create({
      name,
      email,
      password,
   });

   if (user) {
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Sorry, failed to create user.");
   }
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      res.status(404);
      throw new Error("Please enter all the fields.");
   }
   let user;
   if (email) {
      user = await User.findOne({ email });
   }

   if (user && (await user.mathchPassword(password))) {
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid Details");
   }
});

module.exports = {
   registerUser,
   loginUser,
};
