"use strict"

const { response } = require("express")
const UserStorage = require("./UserStorage")

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            const response = await UserStorage.getUserInfo(client.id, client.password);
            return response;
        } catch (err) {
            return { success : false, msg : err };
        }
      
    }

    async register() {
      
        const client = this.body;
        try{
            const response = await UserStorage.save(client)
            return response;
        } catch (err){
            return { success : false, msg : err };
        }
    }
}

module.exports = User;