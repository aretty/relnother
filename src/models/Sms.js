"use strict"

const { response } = require("express")
const SmsStorage = require("./SmsStorage")

class Sms {
    constructor(body) {
        this.body = body;
    }

    async send() {
        const client = this.body;
        try {
            const response = await SmsStorage.sendMessage(client);
            return response;
        } catch (err) {
            return { success : false, msg : err };
        }
      
    }

    
}

module.exports = Sms;