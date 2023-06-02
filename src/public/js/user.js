"use strict"

const id = document.querySelector("#login_id"),
    password = document.querySelector("#login_pw"),
    loginBtn = document.querySelector("button");

// loginBtn.addEventListener("click",login);

function login(){
    const req = {
        id : id.value,
        password : password.value,
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