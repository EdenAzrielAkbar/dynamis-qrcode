import "dotenv/config";
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { addUser, findUser } from "../models/user.mjs";
import { generateQr } from "./qrController.mjs";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accesToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await findUser(email);
        if (!user) {
          const createQr = await generateQr(email);
          user = await addUser(email, createQr);
          return done(null, user);
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
