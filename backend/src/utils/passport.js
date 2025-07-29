import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2" 
import { authService } from "../models/authModel.js";
import dotenv from "dotenv"

dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
  },

   async (accessToken, refreshToken, profile, done) => {   

    try {
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const provider = profile.provider;

      if (!email) {
        return done(new Error("Email not found in Google profile"), null);
      }

      const { token, user } = await authService({ email, name, provider });
      done(null, {user, token});

    } catch (error) {
      console.log(error, "ERROR");        
      done(error, null)
    }

  }

));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/github/callback",
  },

   async (accessToken, refreshToken, profile, done) => {  

    try {

      let email = null;        
      
      // github not providing email therefore explicitly getting it
      const res = await fetch("https://api.github.com/user/emails", {
        headers: {
          "Authorization": `token ${accessToken}`,
          "User-Agent": "uniLink"
        }
      })

      const data = await res.json();      
      
      email = data.find(e => e.primary && e.verified)?.email;    

      const name = profile.displayName;
      const provider = profile.provider;
      
      if (!email) {
        return done(new Error("Email not found in Github profile"), null);
      }

      const { token, user } = await authService({ email, name, provider });
      done(null, {user, token});

    } catch (error) {
      console.log(error, "ERROR");        
      done(error, null)
    }

  }

));