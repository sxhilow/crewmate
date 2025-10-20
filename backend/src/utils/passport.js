import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import {Strategy as MicrosoftStrategy} from "passport-microsoft" 
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
          "User-Agent": "crewmate"
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



passport.use(new MicrosoftStrategy({
    // Standard OAuth2 options
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/microsoft/callback",
    scope: ['user.read'],

    // Microsoft specific options

    // [Optional] The tenant ID for the application. Defaults to 'common'. 
    // Used to construct the authorizationURL and tokenURL
    tenant: 'common',

    // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
    authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',

    // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
    tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',

    // [Optional] The Microsoft Graph API version (e.g., 'v1.0', 'beta'). Defaults to 'v1.0'.
    graphApiVersion: 'v1.0',

    // [Optional] If true, will push the User Principal Name into the `emails` array in the Passport.js profile. Defaults to false.
    addUPNAsEmail: false,
    
    // [Optional] The Microsoft Graph API Entry Point, defaults to https://graph.microsoft.com. Configure this if you are using Azure China or other regional version.
    apiEntryPoint: 'https://graph.microsoft.com',
  },

  async (accessToken, refreshToken, profile, done) => {   

    try {
      console.log(profile);
      
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const provider = profile.provider;


      const allowedDomain = "@my.richfield.ac.za"
      if (!email.toLowerCase().endsWith(allowedDomain)) {
        return done(new Error("Currently only richfield emails are allowed"), null);
      }

      const { token, user } = await authService({ email, name, provider });
      done(null, {user, token});
      
    } catch (error) {
      console.log(error, "ERROR");        
      done(error, null)
    }
  }

));