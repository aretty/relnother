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
    sendSMS('01066014352', '안녕하세요, 알리고 문자 서비스 예제입니다.');
    return res.json('{ "success" : "true" }');
})


const aligoConfig = {
apiKey: 'rid8or0xnfh8iyne9wfiprta7w1495s9', // 알리고 API 키
user_id: 'dkdud4352', // 알리고 사용자 아이디
sender: '01066014352', // 발신자명
};

const sendSMS = async (to, text) => {
try {
    const response = await axios.post('https://apis.aligo.in/send/', {
    key: aligoConfig.apiKey,
    user_id: aligoConfig.user_id,
    sender: aligoConfig.sender,
    receiver: to, // 수신자 전화번호
    msg: text, // 메시지 내용
    });
    console.log(response.data);
} catch (error) {
    console.error(error);
}
};

module.exports = router;