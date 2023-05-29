"use strict"

const User = require("../../models/User")

const output = {
    main : (req, res) => {
        const userName = req.session.userName;
        
        if(userName){
            res.render('index', { userName : userName });
            return;
        }
        res.render('index', { userName : "" })
    },
    login : (req, res) => {
        res.render('login')
    },
    register : (req, res) => {
        res.render('register')
    },
    logout : (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },
    test : (req,res) => {
        res.render('test')
    }
};

const process = {
    login : async (req,res) => {
        const user = new User(req.body);
        const response = await user.login();
        if(response.success){
            req.session.userName = response.name;
        }
        return res.json(response);
    },
    register : async (req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    }
}

module.exports = {
   output,
   process,
};