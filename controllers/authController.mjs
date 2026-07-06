import "dotenv/config";
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { addUser, findUser, updateQr } from "../models/user.mjs";
import { generateQr } from "./qrController.mjs";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accesToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await findUser(email);
        if (!user) {
          user = await addUser(email, "");
          const userId = user._id;
          const createQr = await generateQr(email, userId);
          user = await updateQr(email, createQr);
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
  done(null, user.gmail);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await findUser(email);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
