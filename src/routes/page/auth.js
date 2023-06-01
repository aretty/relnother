"use strict"

const express = require("express")
const router = express.Router()

const controller = require("./controllers")

var passport = require('passport'); //passport 추가
var NaverStrategy = require('passport-naver').Strategy;

router.get('/naver',passport.authenticate('naver', { authType: 'reprompt' }))
router.get('/naver/callback', passport.authenticate('naver', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
 );

passport.use(new NaverStrategy({
    clientID: process.env.NAVER_ID,
    clientSecret: process.env.NAVER_SECRET,
    callbackURL: process.env.NAVER_CALLBACK
},

function(accessToken, refreshToken, profile, done) {

    process.nextTick(function () {

        console.log(profile);
        var user = {
            // name: profile.displayName,
            email: profile.emails[0].value,
            provider: 'naver',
            naver: profile._json

        };

        // console.log("user=");
        // console.log(user);

    
        return done(null, user);

     });

     }

));

//failed to serialize user into session 에러 발생 시 아래의 내용을 추가 한다.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(req, user, done) {
     // passport로 로그인 처리 후 해당 정보를 session에 담는다.

     req.session.sid = user.name;
    //  console.log("Session Check :" +req.session.sid);
    done(null, user);
});

module.exports = router;