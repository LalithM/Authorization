'use strict'

const validator = require('express-validator');

module.exports = ()=>{
  return{
    SignUpValidator: (req,res,next)=>{
      req.checkBody('userName','User Name  is required and should not be empty').notEmpty();
      req.checkBody('userName','User Name should be more than 5 characters').length({min:5});
      req.checkBody('email','Email is required').notEmpty();
      req.checkBody('email','Email is not valid').isEmail();
      req.checkBody('password','Password is required').notEmpty();
      req.checkBody('password','password must be not less than 5').isLength({min:5});

      req.getValidationResult()
      .then((result)=>{
        const errors = result.array();
        const message = [];
        errors.forEach((error)=>{
          message.push(error.msg);
        });
      }).catch((error)=>{
        return next();
      })
    },

    LoginValidator: (req,res,next)=>{
      req.checkBody('email','Email is required').notEmpty();
      req.checkBody('email','Email is not valid').isEmail();
      req.checkBody('password','Password is required').notEmpty();
      req.checkBody('password','password must be not less than 5').isLength({min:5});

      req.getValidationResult()
      .then((result)=>{
        const errors = result.array();
        const message = [];
        errors.forEach((error)=>{
          message.push(error.msg);
        });
      }).catch((error)=>{
        return next();
      })
    }
  }
}

