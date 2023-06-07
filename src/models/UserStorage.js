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
            let suc = true;
            let mes = "";

            const existIdQuery = "select * from users where id = ? order by idx desc limit 1;";
            const existNickQuery = "select * from users where nick = ? order by idx desc limit 1;";
            const authQuery = "select * from sms_history where hp = ? and division = 'register' order by idx desc limit 1;";
            
            //아이디 중복 확인
            const idPromise = new Promise((resolve, reject) => {
                db.query(existIdQuery, [userInfo.id], (err, data) => {
                    if (err) {
                        reject(err);
                    } else if (data.length > 0) {
                        suc = false;
                        mes = "이미 존재하는 아이디입니다.";
                        resolve();
                    } else {
                        resolve();
                    }
                });
            });
            
            //닉네임 중복 확인
            const nickPromise = new Promise((resolve, reject) => {
                db.query(existNickQuery, [userInfo.nick], (err, data) => {
                    if (err) {
                        reject(err);
                    } else if (data.length > 0) {
                        suc = false;
                        mes = "이미 존재하는 닉네임입니다.";
                        resolve();
                    } else {
                        resolve();
                    }
                });
            });

            //인증번호 일치 확인
            const authPromise = new Promise((resolve,reject) => {
                db.query(authQuery,[userInfo.hp], (err, data) => {
                    if (err) {
                        reject(err);
                    } else if (data.length > 0) {
                        let cerNum = data[0].core;
    
                        if(userInfo.authNumber != cerNum){
                            suc = false;
                            mes = "인증 번호가 일치하지 않습니다.";
                        }
                        resolve();
                    } else {
                        suc = false;
                        mes = "휴대폰 인증을 진행해 주세요.";
                        resolve();
                    }
                });
            });

            Promise.all([idPromise, nickPromise, authPromise])
            .then(() => {
                if(suc){
                    let userPassword = userInfo.password;
                    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
                    let hashPassword = crypto.createHash("sha512").update(userPassword + salt).digest("hex");
        
                    const query = "INSERT INTO users(id, nick, password, salt, hp, datetime) VALUES(?, ?, ?, ?, ?, now());";
                    db.query(query,[userInfo.id, userInfo.nick, hashPassword, salt, userInfo.hp], (err) => {
                        if(err) reject(`${err}`);
                    });   
                }
                resolve({ success : suc, msg : mes });
            })
            .catch((error) => {
                reject(error);
            });


            // db.query(existIdQuery,[userInfo.id], (err, data) => {
            //     if(data.length > 0){
            //         suc = false;
            //         mes = "이미 존재하는 아이디입니다.";
            //     }
            // });

            // db.query(existNickQuery,[userInfo.nick], (err, data) => {
            //     if(data.length > 0){
            //         suc = false;
            //         mes = "이미 존재하는 닉네임입니다.";
            //     }
            // });

            // db.query(authQuery,[userInfo.hp], (err, data) => {
            //     if(data.length > 0){
            //         let cerNum = data[0].core;

            //         if(userInfo.authNumber != cerNum){
            //             suc = false;
            //             mes = "인증 번호가 일치하지 않습니다.";
            //         }
            //     } else {
            //         suc = false;
            //         mes = "휴대폰 인증을 진행해 주세요.";
            //     }
            // });
            
            // if(suc){
            //     let userPassword = userInfo.password;
            //     let salt = Math.round((new Date().valueOf() * Math.random())) + "";
            //     let hashPassword = crypto.createHash("sha512").update(userPassword + salt).digest("hex");
    
            //     const query = "INSERT INTO users(id, nick, password, salt, hp, datetime) VALUES(?, ?, ?, ?, ?, now());";
            //     db.query(query,[userInfo.id, userInfo.nick, hashPassword, salt, userInfo.hp], (err) => {
            //         if(err) reject(`${err}`);
            //     });   
            // }
        
            // resolve({ success : suc, msg : mes });
        });
    }
}

module.exports = UserStorage;