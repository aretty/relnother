"use strict"

const db = require("../config/db");
const axios = require('axios');

class SmsStorage {
    static sendMessage(smsInfo){
        return new Promise((resolve,reject) => {

            sendSms({ receivers: [smsInfo.hp], message: smsInfo.msg }).then((result) => {
                console.log('전송결과', result);
            
                if(parseInt(result.error_cnt) == 0){
                    const query = "INSERT INTO sms_history(hp, msg, core, datetime) VALUES(?, ?, ?, now());";
                    db.query(query,[smsInfo.hp, smsInfo.msg, smsInfo.authNum], (err) => {
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