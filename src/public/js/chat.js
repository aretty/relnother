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

socket.on("chatting",(data)=>{
    const li = document.createElement("li")
    li.innerText = `${data.name} : ${data.msg}`;
    chatList.appendChild(li)
})


function sendChat(){
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }
    socket.emit("chatting",param);
    chatInput.value = "";
}