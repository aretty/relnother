"use strict"

const express = require("express")
const router = express.Router()

const controller = require("./controllers")

router.get('/', controller.output.main)
router.get('/login', controller.output.login)
router.get('/register', controller.output.register)
router.get('/logout', controller.output.logout)
router.get('/test',controller.output.test)

router.post('/login', controller.process.login)
router.post('/register', controller.process.register)
router.post('/sendMessage', controller.process.sendMessage)
// (req,res) => {
//     sendSms({ receivers: [req.body.hp], message: req.body.msg }).then((result) => {
//         console.log('전송결과', result);
    
//         /*
//         전송결과 {
//             result_code: '1',
//             message: 'success',
//             msg_id: '83819703',
//             success_cnt: 2,
//             error_cnt: 0,
//             msg_type: 'SMS'
//         }
//         */
//     });

//     var response = {
//         success : true
//     }
//     return res.json(response);
// }



module.exports = router;