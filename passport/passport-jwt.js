'use strict'

const passport = require('passport');
const JwtStragtey = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const config = require('../config/config.json');

let User = require('../models/User');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id,(err,user)=>{
    done(err,user);
  });
});

var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;

passport.use(new JwtStragtey(opts,(req,done)=>{
  User.findOne({'email':req.body.email},(error,user)=>{
    if(error){
      return done(error);
    }
    if(!user || !user.validatPassword(req.body.password)){
      return done(null,false);
    }
    return done(null,user);
  });
})
);
