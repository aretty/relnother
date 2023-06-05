"use strict"

const login_id = document.querySelector("#login_id"),
    login_pw = document.querySelector("#login_pw"),
    loginBtn = document.querySelector(".login-btn");

const id = document.querySelector("#user_id"),
    nick = document.querySelector("#user_nick"),
    password = document.querySelector("#user_pw"),
    passwordRe = document.querySelector("#user_pw_re"),
    hp1 = document.querySelector("#user_hp1"),
    hp2 = document.querySelector("#user_hp2"),
    hp3 = document.querySelector("#user_hp3"),
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
    const idReg = /^[A-Za-z0-9]+$/;
    const nickReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

    if(!id.value){
        show_msg("red","아이디를 입력해 주세요.");
        return;
    }

    if(id.value.length < 4 || id.value.length > 15){
        show_msg("red","아이디는 4자 이상 15자 이하로 입력해 주세요.");
        return;
    }

    if(!idReg.test(id.value)){
        show_msg("red","아이디는 영문/숫자만 입력 가능합니다.");
        return;
    }

    if(!nick.value){
        show_msg("red","닉네임을 입력해 주세요.");
        return;
    }

    if(getByteB(nick.value) < 4){
        show_msg("red","닉네임은 한글 2자 이상, 영어 4자 이상 입력해 주세요.");
        return;
    }

    if(!nickReg.test(nick.value)){
        show_msg("red","닉네임은 한글/영문/숫자만 사용할 수 있습니다.");
        return;
    }

    if(!password.value){
        show_msg("red","비밀번호를 입력해 주세요.");
        return;
    }  

    if(!passwordRe.value){
        show_msg("red","비밀번호를 재입력해 주세요.");
        return;
    }  

    if(password.value !== passwordRe.value){
        show_msg("red","비밀번호가 일치하지 않습니다.");
        return;
    }     


    const req = {
        id : id.value,
        nick : nick.value,
        password : password.value,
        hp : userHp,
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
    const userHp = hp1.value+"-"+hp2.value+"-"+hp3.value;
   
    var hpReg = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

    if(!hpReg.test(userHp)){
        show_msg("red","휴대폰 번호를 올바르게 입력해 주세요.");
        return;  
    }

    const authNum = generateRandomCode(6);
    const smsMsg = "[릴나더]\n인증번호는 ["+authNum+"] 입니다.";

    const req = {
        hp : userHp,
        authNum : authNum,
        msg : smsMsg,
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
            show_msg("green","인증번호가 전송되었습니다.");
        } else {
            console.log(res);
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("문자 발송 중 에러 발생"));
    });
}

function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
}

function show_msg(color,msg){
    if(color == "green"){
        if(!$(".error_msg").hasClass("green")){
            $(".error_msg").addClass("green");
        }
    } else {
        if($(".error_msg").hasClass("green")){
            $(".error_msg").removeClass("green");
        } 
    }
    $(".error_msg").text(msg);
}

function getByteB(str) {
    var byte = 0;
    for (var i=0; i<str.length; ++i) {
    // 기본 한글 2바이트 처리
    (str.charCodeAt(i) > 127) ? byte += 3 : byte++ ;
    }
    
    return byte;
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