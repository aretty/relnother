"use strict"

function setScreenSize() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const sendSms = ({ receivers, message }) => {
    return axios.post('https://apis.aligo.in/send/', null, {
        params: {
            key: process.env.ALIGO_KEY,
            user_id: process.env.ALIGO_ID,
            sender: process.env.ALIGO_SENDER,
            receiver: receivers.join(','),
            msg: message,
            // 테스트모드
            testmode_yn: 'N'
        },
    }).then((res) => res.data).catch(err => {
        console.log('err', err);
    });
}


function openPop(id){
	if($("#"+id).hasClass("animate__fadeOutDownBig")){
		$("#"+id).removeClass("animate__fadeOutDownBig");
	}
	$("#"+id).addClass("on").addClass("animate__animated").addClass("animate__fadeInUpBig");
	
}

function closePop(id){
	$("#"+id).removeClass("animate__fadeInUpBig").addClass("animate__fadeOutDownBig");
	setTimeout(function() {
		$("#"+id).removeClass("on");
	}, 500);
}

$(function(){
	setScreenSize();
	window.addEventListener('resize', setScreenSize);
});