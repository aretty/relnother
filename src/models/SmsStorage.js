"use strict"

const db = require("../config/db");
const axios = require('axios');

class SmsStorage {
    static sendMessage(smsInfo){
        return new Promise((resolve,reject) => {
            let division = smsInfo.division;
            let hp = smsInfo.hp;

            if(division == 'register'){
                const existHpQuery = "select * from users where hp = ? order by idx desc limit 1;";
                db.query(existHpQuery, [hp], (err) => {
                    if(err) reject(`${err}`);

                    if(data.length > 0){
                        var res = {
                            success : false,
                            msg : "이미 가입된 휴대폰 번호입니다.",
                        }
                        resolve(res);
                    } else {
                        sendSms({ receivers: [hp], message: smsInfo.msg }).then((result) => {
                            if(parseInt(result.error_cnt) == 0){
                                const query = "INSERT INTO sms_history(division, hp, msg, core, datetime) VALUES(?, ?, ?, ?, now());";
                                db.query(query,[division, hp, smsInfo.msg, smsInfo.authNum], (err) => {
                                    if(err) reject(`${err}`);
                                    resolve({ success : true });
                                });  
                            } else {
                                var res = {
                                    success : false,
                                    msg : "문자 발송 오류. 다시 시도해 주세요.",
                                }
                                resolve(res);
                            }
                        });
                    }
                });

            } else {
                sendSms({ receivers: [smsInfo.hp], message: smsInfo.msg }).then((result) => {
                    console.log('전송결과', result);
                
                    if(parseInt(result.error_cnt) == 0){
                        const query = "INSERT INTO sms_history(division, hp, msg, core, datetime) VALUES(?, ?, ?, ?, now());";
                        db.query(query,[division, smsInfo.hp, smsInfo.msg, smsInfo.authNum], (err) => {
                            if(err) reject(`${err}`);
                            resolve({ success : true });
                        });  
                    }
                    /*
                    전송결과 {
                        result_code: '1',
                        message: 'success',
                        msg_id: '83819703',
                        success_cnt: 2,
                        error_cnt: 0,
                        msg_type: 'SMS'
                    }
                    */
                });
            }
        });
    }
}

const sendSms = ({ receivers, message }) => {
    return axios.post('https://apis.aligo.in/send/', null, {
        params: {
            key: process.env.ALIGO_KEY,
            user_id: process.env.ALIGO_ID,
            sender: process.env.ALIGO_SENDER,
            receiver: receivers.join(','),
            msg: message,
            testmode_yn: 'N'
        },
    }).then((res) => res.data).catch(err => {
        console.log('err', err);
    });
}

module.exports = SmsStorage;