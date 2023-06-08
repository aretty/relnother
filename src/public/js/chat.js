"use strict"

const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButon = document.querySelector(".send-button")

sendButon.addEventListener("click",()=>{
    sendChat()
})

chatInput.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
        sendChat()
    }  
});

socket.on("chatting-lobby",(data)=>{
    if(data.type == "welcome"){
        $(".chatting-list").append('<li class="welcome"><i class="fa-solid fa-bullhorn"></i> '+data.msg+'</li>');
    } else {
        const li = document.createElement("li")
        li.innerText = `${data.name} : ${data.msg}`;
        chatList.appendChild(li)
        chatList.scrollTop = chatList.scrollHeight;
    }
})


function sendChat(){
    const param = {
        name : nickname.value,
        msg : chatInput.value,
        type : "normal"
    }
    socket.emit("chatting-lobby",param);
    chatInput.value = "";
}