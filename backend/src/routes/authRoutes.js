import express from "express"
import passport from "passport";
import { me } from "../controller/authController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", authMiddleware, me)


// router.get("/google", 
  
//   passport.authenticate('google', { scope: [
//         'openid', 'email', 'profile']
//   })
// )

// router.get("/google/callback", 

//     passport.authenticate('google', {session: false, faliureRedirect: '/login'}),

//     function(req, res){
//         const { token } = req.user;
//         res.redirect(`http://localhost:5173/auth-redirect?token=${token}`)
//     }

// )

// router.get('/github',
//   passport.authenticate('github', { scope: ['user:email'] })
// );

// router.get('/github/callback', 
//   passport.authenticate('github', {session: false, failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     const { token } = req.user;
//     res.redirect(`http://localhost:5173/auth-redirect?token=${token}`)
//   }
// );


router.get('/microsoft',
  passport.authenticate('microsoft', {
    // Optionally define any authentication parameters here
    // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
    
    prompt: 'select_account',
}));

router.get('/microsoft/callback', 
  passport.authenticate('microsoft', {session: false, failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const { token } = req.user;
    res.redirect(`http://localhost:5173/auth-redirect?token=${token}`)
});


export default router