"use strict"

const db = require("../config/db");
const crypto = require('crypto');

class UserStorage {
    static getUserInfo(id, password){
        return new Promise((resolve,reject) => {
            const query = "select * from users where id = ?;";
            db.query(query,[id], (err, data) => {
                if(err) reject(`${err}`);
                
                if(data.length > 0){
                    let dbPassword = data[0].password;
                    let inputPassword = password;
                    let salt = data[0].salt;
                    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
                    
                    if(dbPassword === hashPassword){
                        var res = {
                            success : true,
                            name : data[0].name
                        }
                    } else {
                        var res = {
                            success : false,
                            msg : "비밀번호가 틀렸습니다."
                        }
                    }
                } else {
                    var res = {
                        success : false,
                        msg : "존재하지 않는 아이디입니다."
                    }
                }

                resolve(res);
            });   
        });
    }

    static async save(userInfo){
        return new Promise((resolve,reject) => {

            let userPassword = userInfo.password;
            let salt = Math.round((new Date().valueOf() * Math.random())) + "";
            let hashPassword = crypto.createHash("sha512").update(userPassword + salt).digest("hex");

            const query = "INSERT INTO users(id, nick, password, salt, datetime) VALUES(?, ?, ?, ?, now());";
            db.query(query,[userInfo.id, userInfo.name, hashPassword, salt], (err) => {
                if(err) reject(`${err}`);
                resolve({ success : true });
            });   
        });
    }
}

module.exports = UserStorage;