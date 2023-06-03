"use strict"

const User = require("../../models/User")
const axios = require('axios');

const output = {
    main : (req, res) => {
        // console.log(req.session);
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
    },
    sendMessage : async (req,res) => {
        sendSms({ receivers: [req.body.hp], message: req.body.msg }).then((result) => {
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
    
        var response = {
            success : true
        }
        return res.json(response);
    }
}


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
    

module.exports = {
   output,
   process,
};