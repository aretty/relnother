"use strict"

const express = require("express")
const router = express.Router()

const controller = require("./controllers")

const axios = require('axios');

router.get('/', controller.output.main)
router.get('/login', controller.output.login)
router.get('/register', controller.output.register)
router.get('/logout', controller.output.logout)
router.get('/test',controller.output.test)

router.post('/login', controller.process.login)
router.post('/register', controller.process.register)
router.post('/sendMessage', (req,res) => {
    sendSms({ receivers: ['01012341234', '010-4321-4321'], message: '메시지 테스트' }).then((result) => {
        console.log('전송결과', result);
    
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
    return res.json('{ "success" : "true" }');
})


const aligoConfig = {
apiKey: 'rid8or0xnfh8iyne9wfiprta7w1495s9', // 알리고 API 키
user_id: 'dkdud4352', // 알리고 사용자 아이디
sender: '01066014352', // 발신자명
};

const sendSms = ({ receivers, message }) => {
    return axios.post('https://apis.aligo.in/send/', null, {
        params: {
            key: aligoConfig.apiKey,
            user_id: aligoConfig.user_id,
            sender: aligoConfig.sender,
            receiver: receivers.join(','),
            msg: message,
            // 테스트모드
            testmode_yn: 'N'
        },
    }).then((res) => res.data).catch(err => {
        console.log('err', err);
    });
}

module.exports = router;