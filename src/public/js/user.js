"use strict"

const login_id = document.querySelector("#login_id"),
    login_pw = document.querySelector("#login_pw"),
    loginBtn = document.querySelector(".login-btn");

const id = document.querySelector("#user_id"),
    name = document.querySelector("#user_nick"),
    password = document.querySelector("#user_pw"),
    passwordRe = document.querySelector("#user_pw_re"),
    registerBtn = document.querySelector(".join-btn");

const authBtn = document.querySelector(".auth-btn");

loginBtn.addEventListener("click",login);
registerBtn.addEventListener("click",register);
authBtn.addEventListener("click",sendAuth);

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

function sendAuth(){
    const sms_msg = "[릴나더]\n인증번호는 [203212] 입니다.";

    const req = {
        hp : "01066014352",
        msg : sms_msg,
    };
  
    fetch("/sendMessage",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            console.log(res);
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("문자 발송 중 에러 발생"));
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

    if(isMobile()){
        $("input[type=text], input[type=password]").focus(function(){
            $(".join-wrap").hide();
        });

        $("input[type=text], input[type=password]").blur(function(){
            $(".join-wrap").show();
        });
    }
});