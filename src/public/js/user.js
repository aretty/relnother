"use strict"

const login_id = document.querySelector("#login_id"),
    login_pw = document.querySelector("#login_pw"),
    loginBtn = document.querySelector(".login-btn");

const id = document.querySelector("#user_id"),
    name = document.querySelector("#user_nick"),
    password = document.querySelector("#user_pw"),
    passwordRe = document.querySelector("#user_pw_re"),
    registerBtn = document.querySelector(".join-btn");

loginBtn.addEventListener("click",login);
registerBtn.addEventListener("click",register);

function login(){
    const req = {
        id : login_id.value,
        password : login_pw.value,
    };
    
    fetch("/login",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = "/";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
    });
}


function register(){
    if(!id.value) return alert("아이디를 입력해주세요.");
    if(password.value !== passwordRe.value) return alert("비밀번호가 일치하지 않습니다.");
    

    const req = {
        id : id.value,
        name : name.value,
        password : password.value,
    };
    console.log(req);
    fetch("/register",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = "/login";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("회원가입 중 에러 발생"));
    });
}


$(function(){
    $("#enter_btn").click(function(){
        $(".enter-wrap").fadeOut(1000);
        openPop("loginModal");
    });

    $(".sign-up-btn").click(function(){
        closePop("loginModal");
        openPop("joinModal");
        if(!$("#joinModal").hasClass("animate__delay-1s")){
            $("#joinModal").addClass("animate__delay-1s");
        }
    });

    $(".go-login").click(function(){
        closePop("joinModal");
        openPop("loginModal");
        if(!$("#loginModal").hasClass("animate__delay-1s")){
            $("#loginModal").addClass("animate__delay-1s");
        }
    });

    $(".auth-btn").click(function(){
        sendSms({ receivers: ['01066014352'], message: '메시지 테스트' }).then((result) => {
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
    });

    if(isMobile()){
        $("input[type=text], input[type=password]").focus(function(){
            $(".join-wrap").hide();
        });

        $("input[type=text], input[type=password]").blur(function(){
            $(".join-wrap").show();
        });
    }
});