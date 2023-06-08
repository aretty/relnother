"use strict"

const User = require("../../models/User")
const Sms = require("../../models/Sms")

const output = {
    main : (req, res) => {
        res.render('index')
    },
    // login : (req, res) => {
    //     res.render('login')
    // },
    // register : (req, res) => {
    //     res.render('register')
    // },
    logout : (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },
    test : (req,res) => {
        res.render('test')
    },
    lobby : (req,res) => {
         // console.log(req.session);
         const userName = req.session.userName;
        
         if(userName){
             res.render('main', { userName : userName });
             return;
         }
         res.redirect('/');
    }
};

const process = {
    login : async (req,res) => {
        const user = new User(req.body);
        const response = await user.login();
        if(response.success){
            req.session.userName = response.nick;
        }
        return res.json(response);
    },
    register : async (req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    sendMessage : async (req,res) => {
        const sms = new Sms(req.body);
        const response = await sms.send();
        return res.json(response);
    }
}
    

module.exports = {
   output,
   process,
};