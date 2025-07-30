import express from "express"
import passport from "passport";
import { me } from "../controller/authController.js";

const router = express.Router();

router.get("/me", me)

router.get("/google", 
  
  passport.authenticate('google', { scope: [
        'openid', 'email', 'profile']
  })

)



router.get("/google/callback", 

    passport.authenticate('google', {session: false, faliureRedirect: '/login'}),

    function(req, res){
        const { token } = req.user;
        res.redirect('/')
    }

)

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback', 
  passport.authenticate('github', {session: false, failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const { token } = req.user;
    res.redirect('/');
  }
);

export default router